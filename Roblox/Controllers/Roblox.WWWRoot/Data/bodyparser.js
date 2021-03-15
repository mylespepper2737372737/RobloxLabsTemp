const { parse: parseFormadata } = require('querystring')
const Busboy = require('busboy')

const ALLOWED_ATTACHMENT_MIMES = (process.env.ALLOWED_ATTACHMENT_MIMES || '').split(',')

const parseContent = rawType => {
  if (!rawType) return raw => raw
  else if (rawType.indexOf('json') > -1) return JSON.parse
  else if (rawType.indexOf('x-www-form-urlencoded') > -1) return raw => ({ ...parseFormadata(raw) })
  else if (rawType.indexOf('multipart') > -1) return raw => raw
  else return raw => raw
}

const getRequestBody = (request, { fileTypes } = {}) => new Promise((resolve, reject) => {
  const contentType = request.headers['content-type']
  const allowedFileTypes = fileTypes || ALLOWED_ATTACHMENT_MIMES
  const parser = parseContent(contentType)

  if (parser !== 'multipart') {
    let formData

    request.on('data', data => {
      if (!formData) formData = Buffer.from(data)
      else formData = Buffer.concat([ formData, data ])
    })

    request.on('error', reject)

    request.on('end', () => {
      const parsedData = parser(Buffer.isBuffer(formData) ? formData.toString() : formData)
      return resolve(parsedData)
    })
  } else {
    const bb = new Busboy({ headers: request.headers })
    const payload = { attachments: {} }

    request.pipe(bb)

    bb.on('file', (fieldname, file, filename, encoding, mimetype) => {
      let body

      if (allowedFileTypes.indexOf(mimetype) > -1) file.on('data', data => {
        if (!body) body = Buffer.from(data, 'binary')
        else body = Buffer.concat([ body, data ])
      })
      else file.resume()

      file.on('end', () => {
        if (body) payload.attachments[fieldname] = { fieldname, filename, encoding, mimetype, body }
      })
    })

    bb.on('field', (fieldname, value) => {
      payload[fieldname] = value
    })

    bb.on('finish', () => {
      resolve(payload)
    })
    bb.on('error', reject)
  }
})

module.exports = getRequestBody
