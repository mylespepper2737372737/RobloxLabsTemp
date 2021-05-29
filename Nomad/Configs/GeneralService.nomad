{
	"Stop": false,
	"Region": "eu-west-1",
	"Namespace": "default",
	"ID": "GeneralService",
	"ParentID": "",
	"Name": "GeneralService",
	"Type": "service",
	"Priority": 50,
	"AllAtOnce": false,
	"Datacenters": [
		"eu-west-1a",
		"eu-west-1b",
		"eu-west-1c"
	],
	"Constraints": null,
	"Affinities": null,
	"Spreads": [
		{
			"Attribute": "${node.datacenter}",
			"Weight": 50,
			"SpreadTarget": null
		}
	],
	"TaskGroups": [
		{
			"Name": "GeneralService",
			"Count": 4,
			"Update": {
				"Stagger": 10000000000,
				"MaxParallel": 2,
				"HealthCheck": "checks",
				"MinHealthyTime": 30000000000,
				"HealthyDeadline": 600000000000,
				"ProgressDeadline": 900000000000,
				"AutoRevert": true,
				"AutoPromote": false,
				"Canary": 0
			},
			"Migrate": {
				"MaxParallel": 1,
				"HealthCheck": "checks",
				"MinHealthyTime": 10000000000,
				"HealthyDeadline": 300000000000
			},
			"Constraints": [
				{
					"LTarget": "",
					"RTarget": "",
					"Operand": "distinct_hosts"
				},
				{
					"LTarget": "${attr.cpu.arch}",
					"RTarget": "amd64",
					"Operand": "="
				}
			],
			"Scaling": null,
			"RestartPolicy": {
				"Attempts": 20,
				"Interval": 240000000000,
				"Delay": 10000000000,
				"Mode": "delay"
			},
			"Tasks": [
				{
					"Name": "GeneralService",
					"Driver": "exec",
					"User": "",
					"Config": {
						"args": [
							"local/GeneralService/ACBGeneralService.dll"
						],
						"command": "dotnet"
					},
					"Env": {
						"DB_NAME": "ACB",
						"KEST_PORT": "${NOMAD_PORT_http}",
						"S3_DIR": "media/PRO/",
						"DB_SERVER": "acb-db.acb.com",
						"DB_PASS": "Ei4ooPeor7os2wu",
						"RED_PORT": "6379",
						"S3_ACCESS": "AKIAU6HG43FWWX5RJMXR",
						"MC_USER": "https://static.acb.com/media/PRO/",
						"S3_SECRET_KEY": "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",
						"ENVIROMENT": "Dev",
						"DB_USER": "acbdbcli",
						"RED_HOST": "acb-api-cache.y3bepa.ng.0001.euw1.cache.amazonaws.com",
						"S3_BUCKET": "acb-static-assets"
					},
					"Services": [
						{
							"Name": "GeneralService",
							"TaskName": "",
							"PortLabel": "http",
							"AddressMode": "auto",
							"EnableTagOverride": false,
							"Tags": null,
							"CanaryTags": null,
							"Checks": [
								{
									"Name": "Check Generals Service HTTP port",
									"Type": "tcp",
									"Command": "",
									"Args": null,
									"Path": "",
									"Protocol": "",
									"PortLabel": "",
									"Expose": false,
									"AddressMode": "",
									"Interval": 10000000000,
									"Timeout": 2000000000,
									"InitialStatus": "",
									"TLSSkipVerify": false,
									"Method": "",
									"Header": null,
									"CheckRestart": null,
									"GRPCService": "",
									"GRPCUseTLS": false,
									"TaskName": "",
									"SuccessBeforePassing": 0,
									"FailuresBeforeCritical": 0
								}
							],
							"Connect": null,
							"Meta": null,
							"CanaryMeta": null
						}
					],
					"Vault": null,
					"Templates": null,
					"Constraints": null,
					"Affinities": null,
					"Resources": {
						"CPU": 1000,
						"MemoryMB": 1024,
						"DiskMB": 0,
						"IOPS": 0,
						"Networks": [
							{
								"Mode": "",
								"Device": "",
								"CIDR": "",
								"IP": "",
								"MBits": 10,
								"DNS": null,
								"ReservedPorts": null,
								"DynamicPorts": [
									{
										"Label": "http",
										"Value": 0,
										"To": 0,
										"HostNetwork": "default"
									}
								]
							}
						],
						"Devices": null
					},
					"RestartPolicy": {
						"Attempts": 20,
						"Interval": 240000000000,
						"Delay": 10000000000,
						"Mode": "delay"
					},
					"DispatchPayload": null,
					"Lifecycle": null,
					"Meta": null,
					"KillTimeout": 5000000000,
					"LogConfig": {
						"MaxFiles": 10,
						"MaxFileSizeMB": 10
					},
					"Artifacts": [
						{
							"GetterSource": "s3::https://s3-eu-west-1.amazonaws.com/acb-devel-pkf/DEV/API/GeneralService_v0.5.6.tar.gz",
							"GetterOptions": {
								"aws_access_key_id": "AKIAU6HG43FW2CJY2QRI",
								"aws_access_key_secret": "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"
							},
							"GetterMode": "any",
							"RelativeDest": "local/"
						}
					],
					"Leader": false,
					"ShutdownDelay": 0,
					"VolumeMounts": null,
					"KillSignal": "",
					"Kind": "",
					"CSIPluginConfig": null
				}
			],
			"EphemeralDisk": {
				"Sticky": false,
				"SizeMB": 300,
				"Migrate": false
			},
			"Meta": null,
			"ReschedulePolicy": {
				"Attempts": 0,
				"Interval": 0,
				"Delay": 30000000000,
				"DelayFunction": "exponential",
				"MaxDelay": 3600000000000,
				"Unlimited": true
			},
			"Affinities": null,
			"Spreads": null,
			"Networks": null,
			"Services": null,
			"Volumes": null,
			"ShutdownDelay": null,
			"StopAfterClientDisconnect": null
		}
	],
	"Update": {
		"Stagger": 10000000000,
		"MaxParallel": 2,
		"HealthCheck": "",
		"MinHealthyTime": 0,
		"HealthyDeadline": 0,
		"ProgressDeadline": 0,
		"AutoRevert": false,
		"AutoPromote": false,
		"Canary": 0
	},
	"Multiregion": null,
	"Periodic": null,
	"ParameterizedJob": null,
	"Dispatched": false,
	"Payload": null,
	"Meta": null,
	"ConsulToken": "",
	"VaultToken": "",
	"VaultNamespace": "",
	"NomadTokenID": "",
	"Status": "running",
	"StatusDescription": "",
	"Stable": true,
	"Version": 107,
	"SubmitTime": 1621631596665128700,
	"CreateIndex": 8931,
	"ModifyIndex": 505880,
	"JobModifyIndex": 505641
}
