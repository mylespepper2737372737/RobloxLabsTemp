import { Request, Response } from 'express';

export default {
	method: 'all',
	func: async (_request: Request, response: Response) => {
		return response.status(200).send([
			{
				ID: '1dd5ee98-02fa-6cf6-fcda-5cee6e3438be',
				EvalID: '8a760614-d54c-63f9-5ac8-2c3460fa0a16',
				Name: 'dev-ark.ark[0]',
				Namespace: 'default',
				NodeID: '64cf1f24-7a11-81e1-cb6b-5211424eab8b',
				NodeName: 'nomad-clients-dev-b-jqsj',
				JobID: 'sea-ark13',
				JobType: 'service',
				JobVersion: 2,
				TaskGroup: 'ark',
				DesiredStatus: 'run',
				DesiredDescription: '',
				ClientStatus: 'running',
				ClientDescription: 'Tasks are running',
				DesiredTransition: { Migrate: null, Reschedule: null, ForceReschedule: null },
				TaskStates: {
					ark: {
						State: 'running',
						Failed: false,
						Restarts: 0,
						LastRestart: null,
						StartedAt: '2021-05-04T03:30:37.668448541Z',
						FinishedAt: null,
						Events: [
							{
								Type: 'Received',
								Time: 1620099029161819111,
								Message: '',
								DisplayMessage: 'Task received by client',
								Details: {},
								FailsTask: false,
								RestartReason: '',
								SetupError: '',
								DriverError: '',
								ExitCode: 0,
								Signal: 0,
								KillTimeout: 0,
								KillError: '',
								KillReason: '',
								StartDelay: 0,
								DownloadError: '',
								ValidationError: '',
								DiskLimit: 0,
								FailedSibling: '',
								VaultError: '',
								TaskSignalReason: '',
								TaskSignal: '',
								DriverMessage: '',
								GenericSource: '',
							},
							{
								Type: 'Task Setup',
								Time: 1620099029171614724,
								Message: 'Building Task Directory',
								DisplayMessage: 'Building Task Directory',
								Details: { message: 'Building Task Directory' },
								FailsTask: false,
								RestartReason: '',
								SetupError: '',
								DriverError: '',
								ExitCode: 0,
								Signal: 0,
								KillTimeout: 0,
								KillError: '',
								KillReason: '',
								StartDelay: 0,
								DownloadError: '',
								ValidationError: '',
								DiskLimit: 0,
								FailedSibling: '',
								VaultError: '',
								TaskSignalReason: '',
								TaskSignal: '',
								DriverMessage: '',
								GenericSource: '',
							},
							{
								Type: 'Driver',
								Time: 1620099029239416944,
								Message: '',
								DisplayMessage: 'Downloading image',
								Details: { image: 'jippi/ark:latest' },
								FailsTask: false,
								RestartReason: '',
								SetupError: '',
								DriverError: '',
								ExitCode: 0,
								Signal: 0,
								KillTimeout: 0,
								KillError: '',
								KillReason: '',
								StartDelay: 0,
								DownloadError: '',
								ValidationError: '',
								DiskLimit: 0,
								FailedSibling: '',
								VaultError: '',
								TaskSignalReason: '',
								TaskSignal: '',
								DriverMessage: 'Downloading image',
								GenericSource: '',
							},
							{
								Type: 'Started',
								Time: 1620099037668442338,
								Message: '',
								DisplayMessage: 'Task started by client',
								Details: {},
								FailsTask: false,
								RestartReason: '',
								SetupError: '',
								DriverError: '',
								ExitCode: 0,
								Signal: 0,
								KillTimeout: 0,
								KillError: '',
								KillReason: '',
								StartDelay: 0,
								DownloadError: '',
								ValidationError: '',
								DiskLimit: 0,
								FailedSibling: '',
								VaultError: '',
								TaskSignalReason: '',
								TaskSignal: '',
								DriverMessage: '',
								GenericSource: '',
							},
						],
					},
					'log-shipper': {
						State: 'running',
						Failed: false,
						Restarts: 0,
						LastRestart: null,
						StartedAt: '2021-05-04T03:30:29.784936995Z',
						FinishedAt: null,
						Events: [
							{
								Type: 'Received',
								Time: 1620099029162229261,
								Message: '',
								DisplayMessage: 'Task received by client',
								Details: {},
								FailsTask: false,
								RestartReason: '',
								SetupError: '',
								DriverError: '',
								ExitCode: 0,
								Signal: 0,
								KillTimeout: 0,
								KillError: '',
								KillReason: '',
								StartDelay: 0,
								DownloadError: '',
								ValidationError: '',
								DiskLimit: 0,
								FailedSibling: '',
								VaultError: '',
								TaskSignalReason: '',
								TaskSignal: '',
								DriverMessage: '',
								GenericSource: '',
							},
							{
								Type: 'Task Setup',
								Time: 1620099029165867709,
								Message: 'Building Task Directory',
								DisplayMessage: 'Building Task Directory',
								Details: { message: 'Building Task Directory' },
								FailsTask: false,
								RestartReason: '',
								SetupError: '',
								DriverError: '',
								ExitCode: 0,
								Signal: 0,
								KillTimeout: 0,
								KillError: '',
								KillReason: '',
								StartDelay: 0,
								DownloadError: '',
								ValidationError: '',
								DiskLimit: 0,
								FailedSibling: '',
								VaultError: '',
								TaskSignalReason: '',
								TaskSignal: '',
								DriverMessage: '',
								GenericSource: '',
							},
							{
								Type: 'Started',
								Time: 1620099029784931474,
								Message: '',
								DisplayMessage: 'Task started by client',
								Details: {},
								FailsTask: false,
								RestartReason: '',
								SetupError: '',
								DriverError: '',
								ExitCode: 0,
								Signal: 0,
								KillTimeout: 0,
								KillError: '',
								KillReason: '',
								StartDelay: 0,
								DownloadError: '',
								ValidationError: '',
								DiskLimit: 0,
								FailedSibling: '',
								VaultError: '',
								TaskSignalReason: '',
								TaskSignal: '',
								DriverMessage: '',
								GenericSource: '',
							},
						],
					},
				},
				DeploymentStatus: { Healthy: true, Timestamp: '2021-05-04T03:30:52.166325706Z', Canary: false, ModifyIndex: 285276 },
				FollowupEvalID: '',
				RescheduleTracker: null,
				PreemptedAllocations: null,
				PreemptedByAllocation: '',
				CreateIndex: 285270,
				ModifyIndex: 285276,
				CreateTime: 1620099029135746569,
				ModifyTime: 1620099052246960107,
			},
			{
				ID: '40f88047-6107-b6bf-3360-e3b6141d0cb2',
				EvalID: 'b2f527db-0da8-8ceb-47f7-0c88196ed690',
				Name: 'dev-tse-oss-to-bq-start/periodic-1621584000.start-2021-04-16T15:00:31+08:00[0]',
				Namespace: 'default',
				NodeID: '64cf1f24-7a11-81e1-cb6b-5211424eab8b',
				NodeName: 'nomad-clients-dev-b-jqsj',
				JobID: 'dev-tse-oss-to-bq-start/periodic-1621584000',
				JobType: 'batch',
				JobVersion: 0,
				TaskGroup: 'start-2021-04-16T15:00:31+08:00',
				DesiredStatus: 'run',
				DesiredDescription: '',
				ClientStatus: 'failed',
				ClientDescription: 'Failed tasks',
				DesiredTransition: { Migrate: null, Reschedule: null, ForceReschedule: null },
				TaskStates: {
					'log-shipper-dev-tse-oss-to-bq': {
						State: 'dead',
						Failed: false,
						Restarts: 0,
						LastRestart: null,
						StartedAt: '2021-05-21T08:00:01.432810844Z',
						FinishedAt: '2021-05-21T08:00:26.427377866Z',
						Events: [
							{
								Type: 'Received',
								Time: 1621584000030698908,
								Message: '',
								DisplayMessage: 'Task received by client',
								Details: {},
								FailsTask: false,
								RestartReason: '',
								SetupError: '',
								DriverError: '',
								ExitCode: 0,
								Signal: 0,
								KillTimeout: 0,
								KillError: '',
								KillReason: '',
								StartDelay: 0,
								DownloadError: '',
								ValidationError: '',
								DiskLimit: 0,
								FailedSibling: '',
								VaultError: '',
								TaskSignalReason: '',
								TaskSignal: '',
								DriverMessage: '',
								GenericSource: '',
							},
							{
								Type: 'Task Setup',
								Time: 1621584000035056889,
								Message: 'Building Task Directory',
								DisplayMessage: 'Building Task Directory',
								Details: { message: 'Building Task Directory' },
								FailsTask: false,
								RestartReason: '',
								SetupError: '',
								DriverError: '',
								ExitCode: 0,
								Signal: 0,
								KillTimeout: 0,
								KillError: '',
								KillReason: '',
								StartDelay: 0,
								DownloadError: '',
								ValidationError: '',
								DiskLimit: 0,
								FailedSibling: '',
								VaultError: '',
								TaskSignalReason: '',
								TaskSignal: '',
								DriverMessage: '',
								GenericSource: '',
							},
							{
								Type: 'Started',
								Time: 1621584001432805938,
								Message: '',
								DisplayMessage: 'Task started by client',
								Details: {},
								FailsTask: false,
								RestartReason: '',
								SetupError: '',
								DriverError: '',
								ExitCode: 0,
								Signal: 0,
								KillTimeout: 0,
								KillError: '',
								KillReason: '',
								StartDelay: 0,
								DownloadError: '',
								ValidationError: '',
								DiskLimit: 0,
								FailedSibling: '',
								VaultError: '',
								TaskSignalReason: '',
								TaskSignal: '',
								DriverMessage: '',
								GenericSource: '',
							},
							{
								Type: 'Sibling Task Failed',
								Time: 1621584026231754747,
								Message: '',
								DisplayMessage: 'Task\'s sibling "dev-tse-oss-to-bq" failed',
								Details: { failed_sibling: 'dev-tse-oss-to-bq' },
								FailsTask: false,
								RestartReason: '',
								SetupError: '',
								DriverError: '',
								ExitCode: 0,
								Signal: 0,
								KillTimeout: 0,
								KillError: '',
								KillReason: '',
								StartDelay: 0,
								DownloadError: '',
								ValidationError: '',
								DiskLimit: 0,
								FailedSibling: 'dev-tse-oss-to-bq',
								VaultError: '',
								TaskSignalReason: '',
								TaskSignal: '',
								DriverMessage: '',
								GenericSource: '',
							},
							{
								Type: 'Killing',
								Time: 1621584026237569957,
								Message: '',
								DisplayMessage: 'Sent interrupt. Waiting 10s before force killing',
								Details: { kill_timeout: '10s' },
								FailsTask: false,
								RestartReason: '',
								SetupError: '',
								DriverError: '',
								ExitCode: 0,
								Signal: 0,
								KillTimeout: 10000000000,
								KillError: '',
								KillReason: '',
								StartDelay: 0,
								DownloadError: '',
								ValidationError: '',
								DiskLimit: 0,
								FailedSibling: '',
								VaultError: '',
								TaskSignalReason: '',
								TaskSignal: '',
								DriverMessage: '',
								GenericSource: '',
							},
							{
								Type: 'Terminated',
								Time: 1621584026408984962,
								Message: '',
								DisplayMessage: 'Exit Code: 0',
								Details: { exit_code: '0', signal: '0', oom_killed: 'false' },
								FailsTask: false,
								RestartReason: '',
								SetupError: '',
								DriverError: '',
								ExitCode: 0,
								Signal: 0,
								KillTimeout: 0,
								KillError: '',
								KillReason: '',
								StartDelay: 0,
								DownloadError: '',
								ValidationError: '',
								DiskLimit: 0,
								FailedSibling: '',
								VaultError: '',
								TaskSignalReason: '',
								TaskSignal: '',
								DriverMessage: '',
								GenericSource: '',
							},
							{
								Type: 'Killed',
								Time: 1621584026425489054,
								Message: '',
								DisplayMessage: 'Task successfully killed',
								Details: {},
								FailsTask: false,
								RestartReason: '',
								SetupError: '',
								DriverError: '',
								ExitCode: 0,
								Signal: 0,
								KillTimeout: 0,
								KillError: '',
								KillReason: '',
								StartDelay: 0,
								DownloadError: '',
								ValidationError: '',
								DiskLimit: 0,
								FailedSibling: '',
								VaultError: '',
								TaskSignalReason: '',
								TaskSignal: '',
								DriverMessage: '',
								GenericSource: '',
							},
						],
					},
					'dev-tse-oss-to-bq': {
						State: 'dead',
						Failed: true,
						Restarts: 0,
						LastRestart: null,
						StartedAt: '2021-05-21T08:00:19.792213764Z',
						FinishedAt: '2021-05-21T08:00:26.226774822Z',
						Events: [
							{
								Type: 'Received',
								Time: 1621584000030211118,
								Message: '',
								DisplayMessage: 'Task received by client',
								Details: {},
								FailsTask: false,
								RestartReason: '',
								SetupError: '',
								DriverError: '',
								ExitCode: 0,
								Signal: 0,
								KillTimeout: 0,
								KillError: '',
								KillReason: '',
								StartDelay: 0,
								DownloadError: '',
								ValidationError: '',
								DiskLimit: 0,
								FailedSibling: '',
								VaultError: '',
								TaskSignalReason: '',
								TaskSignal: '',
								DriverMessage: '',
								GenericSource: '',
							},
							{
								Type: 'Task Setup',
								Time: 1621584000045402948,
								Message: 'Building Task Directory',
								DisplayMessage: 'Building Task Directory',
								Details: { message: 'Building Task Directory' },
								FailsTask: false,
								RestartReason: '',
								SetupError: '',
								DriverError: '',
								ExitCode: 0,
								Signal: 0,
								KillTimeout: 0,
								KillError: '',
								KillReason: '',
								StartDelay: 0,
								DownloadError: '',
								ValidationError: '',
								DiskLimit: 0,
								FailedSibling: '',
								VaultError: '',
								TaskSignalReason: '',
								TaskSignal: '',
								DriverMessage: '',
								GenericSource: '',
							},
							{
								Type: 'Driver',
								Time: 1621584001252847712,
								Message: '',
								DisplayMessage: 'Downloading image',
								Details: { image: 'gcr.io/ghpr-mgmt/box:box-1.70' },
								FailsTask: false,
								RestartReason: '',
								SetupError: '',
								DriverError: '',
								ExitCode: 0,
								Signal: 0,
								KillTimeout: 0,
								KillError: '',
								KillReason: '',
								StartDelay: 0,
								DownloadError: '',
								ValidationError: '',
								DiskLimit: 0,
								FailedSibling: '',
								VaultError: '',
								TaskSignalReason: '',
								TaskSignal: '',
								DriverMessage: 'Downloading image',
								GenericSource: '',
							},
							{
								Type: 'Started',
								Time: 1621584019792209129,
								Message: '',
								DisplayMessage: 'Task started by client',
								Details: {},
								FailsTask: false,
								RestartReason: '',
								SetupError: '',
								DriverError: '',
								ExitCode: 0,
								Signal: 0,
								KillTimeout: 0,
								KillError: '',
								KillReason: '',
								StartDelay: 0,
								DownloadError: '',
								ValidationError: '',
								DiskLimit: 0,
								FailedSibling: '',
								VaultError: '',
								TaskSignalReason: '',
								TaskSignal: '',
								DriverMessage: '',
								GenericSource: '',
							},
							{
								Type: 'Terminated',
								Time: 1621584026208624435,
								Message: 'Docker container exited with non-zero exit code: 1',
								DisplayMessage: 'Exit Code: 1, Exit Message: "Docker container exited with non-zero exit code: 1"',
								Details: {
									signal: '0',
									oom_killed: 'false',
									exit_message: 'Docker container exited with non-zero exit code: 1',
									exit_code: '1',
								},
								FailsTask: false,
								RestartReason: '',
								SetupError: '',
								DriverError: '',
								ExitCode: 1,
								Signal: 0,
								KillTimeout: 0,
								KillError: '',
								KillReason: '',
								StartDelay: 0,
								DownloadError: '',
								ValidationError: '',
								DiskLimit: 0,
								FailedSibling: '',
								VaultError: '',
								TaskSignalReason: '',
								TaskSignal: '',
								DriverMessage: '',
								GenericSource: '',
							},
							{
								Type: 'Not Restarting',
								Time: 1621584026226768001,
								Message: '',
								DisplayMessage: 'Policy allows no restarts',
								Details: { fails_task: 'true', restart_reason: 'Policy allows no restarts' },
								FailsTask: true,
								RestartReason: 'Policy allows no restarts',
								SetupError: '',
								DriverError: '',
								ExitCode: 0,
								Signal: 0,
								KillTimeout: 0,
								KillError: '',
								KillReason: '',
								StartDelay: 0,
								DownloadError: '',
								ValidationError: '',
								DiskLimit: 0,
								FailedSibling: '',
								VaultError: '',
								TaskSignalReason: '',
								TaskSignal: '',
								DriverMessage: '',
								GenericSource: '',
							},
							{
								Type: 'Killing',
								Time: 1621584026235227535,
								Message: '',
								DisplayMessage: 'Sent interrupt. Waiting 5s before force killing',
								Details: { kill_timeout: '5s' },
								FailsTask: false,
								RestartReason: '',
								SetupError: '',
								DriverError: '',
								ExitCode: 0,
								Signal: 0,
								KillTimeout: 5000000000,
								KillError: '',
								KillReason: '',
								StartDelay: 0,
								DownloadError: '',
								ValidationError: '',
								DiskLimit: 0,
								FailedSibling: '',
								VaultError: '',
								TaskSignalReason: '',
								TaskSignal: '',
								DriverMessage: '',
								GenericSource: '',
							},
						],
					},
				},
				DeploymentStatus: null,
				FollowupEvalID: '',
				RescheduleTracker: null,
				PreemptedAllocations: null,
				PreemptedByAllocation: '',
				CreateIndex: 310493,
				ModifyIndex: 310499,
				CreateTime: 1621584000010276411,
				ModifyTime: 1621584026447494246,
			},
		]);
	},
};