<h4 align="center">A Node.js version of MFD's TestSite.</h4>
<br>
<p align="center">
    <a href="https://discord.gg/afahYa5VvX"><img src="https://img.shields.io/badge/Discord-MFD%20Engine%20Team%20Chat-blue.svg?style=flat-square" alt="MFD Engine Team Discord"/></a>
</p>
<p align="center">
  <a href="#about">About</a> •
  <a href="#installation">Installation</a> •
  <a href="#credits">Credits</a>
</p>

# About

mfdlabs.com is a site that allows mfd engineers to test new features, it is never guaranteed that this will be up at all times.

This branch is for tests of sessionsv2, and many other things that are too unstable for the main branch.

# Installation

You will have to clone the repository and add all the folders and files that this complains about.

```bash
# Run this to install mfdlabs.com 
$ git clone https://github.com/mfd-core/mfdlabs.com.git
```

That's it!

# Credits

-   [MFD CO](https://github.com/mfd-core) - MFD Engine and backend Team

# Notice
Consider moving DFFlagIsAuthV2Enabled to FFlagIsAuthV2Enabled.

Consider making X-CSRF-TOKEN system a run-time middleware/helper.

DO NOT use FastLog just to log every open request, log fails or important info etc