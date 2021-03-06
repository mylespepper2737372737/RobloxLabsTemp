import { Request, Response } from 'express';

export default {
	method: 'all',
	func: async (_request: Request, response: Response) => {
		return response.status(200).send({
			Stop: false,
			Region: 'eu-west-1223',
			Namespace: 'default',
			ID: 'sea-ark13',
			ParentID: '',
			Name: 'sea-ark13',
			Type: 'service',
			Priority: 50,
			AllAtOnce: false,
			Datacenters: ['ark-1773.eu-west'],
			Constraints: [{ LTarget: '${node.unique.name}', RTarget: 'nomad-clients-dev.+', Operand: 'regexp' }],
			Affinities: null,
			Spreads: null,
			TaskGroups: [
				{
					Name: 'ark',
					Count: 1,
					Update: {
						Stagger: 30000000000,
						MaxParallel: 1,
						HealthCheck: 'checks',
						MinHealthyTime: 10000000000,
						HealthyDeadline: 300000000000,
						ProgressDeadline: 600000000000,
						AutoRevert: false,
						AutoPromote: false,
						Canary: 0,
					},
					Migrate: { MaxParallel: 1, HealthCheck: 'checks', MinHealthyTime: 10000000000, HealthyDeadline: 300000000000 },
					Constraints: null,
					Scaling: null,
					RestartPolicy: { Attempts: 2, Interval: 1800000000000, Delay: 15000000000, Mode: 'fail' },
					Tasks: [
						{
							Name: 'ark',
							Driver: 'docker',
							User: '',
							Config: { image: 'jippi/ark:latest', hostname: 'sea-ark13-${NOMAD_ALLOC_INDEX}' },
							Env: {
								CONSUL_ENABLE: '1',
								NOMAD_ADDR: 'http://nomad.service.consul:4646',
								NOMAD_ENABLE: '1',
								CONSUL_ADDR: 'http://consul.service.consul:8500',
							},
							Services: [
								{
									Name: 'sea-ark13',
									TaskName: '',
									PortLabel: 'http',
									AddressMode: 'auto',
									EnableTagOverride: false,
									Tags: ['http', 'ui', 'dev', 'latest'],
									CanaryTags: null,
									Checks: [
										{
											Name: 'service: "sea-ark13" check',
											Type: 'http',
											Command: '',
											Args: null,
											Path: '/',
											Protocol: '',
											PortLabel: '',
											Expose: false,
											AddressMode: '',
											Interval: 10000000000,
											Timeout: 2000000000,
											InitialStatus: '',
											TLSSkipVerify: false,
											Method: '',
											Header: null,
											CheckRestart: null,
											GRPCService: '',
											GRPCUseTLS: false,
											TaskName: '',
											SuccessBeforePassing: 0,
											FailuresBeforeCritical: 0,
										},
									],
									Connect: null,
									Meta: null,
									CanaryMeta: null,
								},
							],
							Vault: null,
							Templates: null,
							Constraints: null,
							Affinities: null,
							Resources: {
								CPU: 200,
								MemoryMB: 128,
								DiskMB: 0,
								IOPS: 0,
								Networks: [
									{
										Mode: '',
										Device: '',
										CIDR: '',
										IP: '',
										MBits: 1,
										DNS: null,
										ReservedPorts: null,
										DynamicPorts: [{ Label: 'http', Value: 0, To: 0, HostNetwork: 'default' }],
									},
								],
								Devices: null,
							},
							RestartPolicy: { Attempts: 2, Interval: 1800000000000, Delay: 15000000000, Mode: 'fail' },
							DispatchPayload: null,
							Lifecycle: null,
							Meta: null,
							KillTimeout: 5000000000,
							LogConfig: { MaxFiles: 10, MaxFileSizeMB: 10 },
							Artifacts: null,
							Leader: true,
							ShutdownDelay: 0,
							VolumeMounts: null,
							KillSignal: '',
							Kind: '',
							CSIPluginConfig: null,
						},
						{
							Name: 'log-shipper',
							Driver: 'docker',
							User: '',
							Config: {
								volumes: ['local/:/usr/share/fb-config'],
								args: ['-e', '-c', '/usr/share/fb-config/filebeat.yml'],
								command: 'filebeat',
								hostname: 'log-shipper-sea-ark13-${NOMAD_ALLOC_INDEX}',
								image: 'docker.elastic.co/beats/filebeat:6.7.2',
							},
							Env: null,
							Services: null,
							Vault: null,
							Templates: [
								{
									SourcePath: '',
									DestPath: 'local/filebeat.yml',
									EmbeddedTmpl:
										'---\nfilebeat.inputs:\n- type: log\n  enabled: true\n  paths:\n    - {{ env "NOMAD_ALLOC_DIR" }}/logs/*.stderr.[0-9]\n    - {{ env "NOMAD_ALLOC_DIR" }}/logs/*.stdout.[0-9]\noutput.logstash:\n    hosts: ["{{ key "service/logstash/host" }}"]\n',
									ChangeMode: 'restart',
									ChangeSignal: '',
									Splay: 5000000000,
									Perms: '0644',
									LeftDelim: '{{',
									RightDelim: '}}',
									Envvars: false,
									VaultGrace: 0,
								},
							],
							Constraints: null,
							Affinities: null,
							Resources: { CPU: 100, MemoryMB: 300, DiskMB: 0, IOPS: 0, Networks: null, Devices: null },
							RestartPolicy: { Attempts: 2, Interval: 1800000000000, Delay: 15000000000, Mode: 'fail' },
							DispatchPayload: null,
							Lifecycle: null,
							Meta: null,
							KillTimeout: 10000000000,
							LogConfig: { MaxFiles: 10, MaxFileSizeMB: 10 },
							Artifacts: null,
							Leader: false,
							ShutdownDelay: 0,
							VolumeMounts: null,
							KillSignal: '',
							Kind: '',
							CSIPluginConfig: null,
						},
					],
					EphemeralDisk: { Sticky: false, SizeMB: 300, Migrate: false },
					Meta: null,
					ReschedulePolicy: {
						Attempts: 0,
						Interval: 0,
						Delay: 30000000000,
						DelayFunction: 'exponential',
						MaxDelay: 3600000000000,
						Unlimited: true,
					},
					Affinities: null,
					Spreads: null,
					Networks: null,
					Services: null,
					Volumes: null,
					ShutdownDelay: null,
					StopAfterClientDisconnect: null,
				},
			],
			Update: {
				Stagger: 30000000000,
				MaxParallel: 1,
				HealthCheck: '',
				MinHealthyTime: 0,
				HealthyDeadline: 0,
				ProgressDeadline: 0,
				AutoRevert: false,
				AutoPromote: false,
				Canary: 0,
			},
			Multiregion: null,
			Periodic: null,
			ParameterizedJob: null,
			Dispatched: false,
			Payload: null,
			Meta: null,
			ConsulToken: '',
			VaultToken: '',
			VaultNamespace: '',
			NomadTokenID: '',
			Status: 'running',
			StatusDescription: '',
			Stable: true,
			Version: 2,
			SubmitTime: 1620099029128501601,
			CreateIndex: 123032,
			ModifyIndex: 285278,
			JobModifyIndex: 285269,
		});
	},
};
