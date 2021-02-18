
namespace CRAC
{
    partial class MainWindow
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle1 = new System.Windows.Forms.DataGridViewCellStyle();
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle2 = new System.Windows.Forms.DataGridViewCellStyle();
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(MainWindow));
            this.OperationType = new System.Windows.Forms.GroupBox();
            this.RevertRadioButton = new System.Windows.Forms.RadioButton();
            this.DeployRadioButton = new System.Windows.Forms.RadioButton();
            this.Deployments = new System.Windows.Forms.GroupBox();
            this.DeploymentGrid = new System.Windows.Forms.DataGridView();
            this.DeploymentName = new System.Windows.Forms.DataGridViewButtonColumn();
            this.Rollbacks = new System.Windows.Forms.GroupBox();
            this.BuildDirectory = new System.Windows.Forms.Button();
            this.IISResetDirectory = new System.Windows.Forms.Button();
            this.UploaderDirectory = new System.Windows.Forms.Button();
            this.TemporaryFiles = new System.Windows.Forms.Button();
            this.BuildDirectoryText = new System.Windows.Forms.TextBox();
            this.IISResetDirectoryText = new System.Windows.Forms.TextBox();
            this.UploaderDirectoryText = new System.Windows.Forms.TextBox();
            this.TemporaryFilesText = new System.Windows.Forms.TextBox();
            this.MD5Hashes = new System.Windows.Forms.GroupBox();
            this.MacMD5HashCurrent = new System.Windows.Forms.TextBox();
            this.PCMD5HashCurrent = new System.Windows.Forms.TextBox();
            this.MacMD5HashOld = new System.Windows.Forms.TextBox();
            this.PCMD5HashOld = new System.Windows.Forms.TextBox();
            this.MacLabel = new System.Windows.Forms.Label();
            this.PCLabel = new System.Windows.Forms.Label();
            this.Versions = new System.Windows.Forms.GroupBox();
            this.GridAndMegagridVersionNew = new System.Windows.Forms.TextBox();
            this.GridVersionCurrent = new System.Windows.Forms.TextBox();
            this.PCClientBootstrapperVersionNew = new System.Windows.Forms.TextBox();
            this.PCClientMFCVersionNew = new System.Windows.Forms.TextBox();
            this.MacStudioVersionNew = new System.Windows.Forms.TextBox();
            this.MacClientVersionNew = new System.Windows.Forms.TextBox();
            this.RCCServiceVersionNew = new System.Windows.Forms.TextBox();
            this.MegagridLabel = new System.Windows.Forms.Label();
            this.GridLabel = new System.Windows.Forms.Label();
            this.PCClientBootstapperLabel = new System.Windows.Forms.Label();
            this.PCClientMFCLabel = new System.Windows.Forms.Label();
            this.MacStudioLabel = new System.Windows.Forms.Label();
            this.MacClientLabel = new System.Windows.Forms.Label();
            this.RCCServiceLabel = new System.Windows.Forms.Label();
            this.NewVersionLabel = new System.Windows.Forms.Label();
            this.CurrentVersionsLabel = new System.Windows.Forms.Label();
            this.MegagridVersionCurrent = new System.Windows.Forms.TextBox();
            this.BuildConfiguration = new System.Windows.Forms.GroupBox();
            this.BuildConfigurationDropdown = new System.Windows.Forms.ComboBox();
            this.BuildMachines = new System.Windows.Forms.DataGridView();
            this.BuildIP = new System.Windows.Forms.DataGridViewButtonColumn();
            this.BuildCores = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.BuildEnviornmentCount = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.Steps = new System.Windows.Forms.GroupBox();
            this.ConfirmAllActions = new System.Windows.Forms.CheckBox();
            this.UpgradeGrid = new System.Windows.Forms.CheckBox();
            this.RunIISReset = new System.Windows.Forms.CheckBox();
            this.SignBinaries = new System.Windows.Forms.CheckBox();
            this.ShutdownGames = new System.Windows.Forms.CheckBox();
            this.UpdateMD5Hash = new System.Windows.Forms.CheckBox();
            this.RunUploader = new System.Windows.Forms.CheckBox();
            this.All = new System.Windows.Forms.CheckBox();
            this.GridUpgrade = new System.Windows.Forms.GroupBox();
            this.SelectAll = new System.Windows.Forms.CheckBox();
            this.StagedProductionDeploy = new System.Windows.Forms.CheckBox();
            this.UseGrdBalancer = new System.Windows.Forms.CheckBox();
            this.DeployProgress = new System.Windows.Forms.ProgressBar();
            this.DeployButton = new System.Windows.Forms.Button();
            this.KillButton = new System.Windows.Forms.Button();
            this.Output = new System.Windows.Forms.ListBox();
            this.OperationType.SuspendLayout();
            this.Deployments.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.DeploymentGrid)).BeginInit();
            this.MD5Hashes.SuspendLayout();
            this.Versions.SuspendLayout();
            this.BuildConfiguration.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.BuildMachines)).BeginInit();
            this.Steps.SuspendLayout();
            this.GridUpgrade.SuspendLayout();
            this.SuspendLayout();
            // 
            // OperationType
            // 
            this.OperationType.Controls.Add(this.RevertRadioButton);
            this.OperationType.Controls.Add(this.DeployRadioButton);
            this.OperationType.Location = new System.Drawing.Point(550, 10);
            this.OperationType.Name = "OperationType";
            this.OperationType.Padding = new System.Windows.Forms.Padding(0);
            this.OperationType.Size = new System.Drawing.Size(350, 50);
            this.OperationType.TabIndex = 4;
            this.OperationType.TabStop = false;
            this.OperationType.Text = "Operation Type";
            // 
            // RevertRadioButton
            // 
            this.RevertRadioButton.AutoSize = true;
            this.RevertRadioButton.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.RevertRadioButton.Location = new System.Drawing.Point(244, 16);
            this.RevertRadioButton.Name = "RevertRadioButton";
            this.RevertRadioButton.Size = new System.Drawing.Size(74, 24);
            this.RevertRadioButton.TabIndex = 1;
            this.RevertRadioButton.Text = "Revert";
            this.RevertRadioButton.UseVisualStyleBackColor = true;
            // 
            // DeployRadioButton
            // 
            this.DeployRadioButton.AutoSize = true;
            this.DeployRadioButton.Checked = true;
            this.DeployRadioButton.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.DeployRadioButton.Location = new System.Drawing.Point(23, 16);
            this.DeployRadioButton.Name = "DeployRadioButton";
            this.DeployRadioButton.Size = new System.Drawing.Size(76, 24);
            this.DeployRadioButton.TabIndex = 0;
            this.DeployRadioButton.TabStop = true;
            this.DeployRadioButton.Text = "Deploy";
            this.DeployRadioButton.UseVisualStyleBackColor = true;
            // 
            // Deployments
            // 
            this.Deployments.Controls.Add(this.DeploymentGrid);
            this.Deployments.Location = new System.Drawing.Point(550, 66);
            this.Deployments.Name = "Deployments";
            this.Deployments.Size = new System.Drawing.Size(350, 400);
            this.Deployments.TabIndex = 5;
            this.Deployments.TabStop = false;
            this.Deployments.Text = "Deployments to Upload";
            // 
            // DeploymentGrid
            // 
            this.DeploymentGrid.AllowUserToAddRows = false;
            this.DeploymentGrid.AllowUserToDeleteRows = false;
            this.DeploymentGrid.AllowUserToResizeColumns = false;
            this.DeploymentGrid.AllowUserToResizeRows = false;
            this.DeploymentGrid.BackgroundColor = System.Drawing.SystemColors.ButtonHighlight;
            this.DeploymentGrid.CausesValidation = false;
            this.DeploymentGrid.ClipboardCopyMode = System.Windows.Forms.DataGridViewClipboardCopyMode.Disable;
            this.DeploymentGrid.ColumnHeadersHeight = 20;
            this.DeploymentGrid.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.DisableResizing;
            this.DeploymentGrid.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.DeploymentName});
            this.DeploymentGrid.Dock = System.Windows.Forms.DockStyle.Fill;
            this.DeploymentGrid.EditMode = System.Windows.Forms.DataGridViewEditMode.EditOnEnter;
            this.DeploymentGrid.GridColor = System.Drawing.SystemColors.Control;
            this.DeploymentGrid.ImeMode = System.Windows.Forms.ImeMode.On;
            this.DeploymentGrid.Location = new System.Drawing.Point(3, 16);
            this.DeploymentGrid.Name = "DeploymentGrid";
            this.DeploymentGrid.ReadOnly = true;
            this.DeploymentGrid.RowHeadersBorderStyle = System.Windows.Forms.DataGridViewHeaderBorderStyle.None;
            dataGridViewCellStyle1.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle1.BackColor = System.Drawing.SystemColors.Control;
            dataGridViewCellStyle1.Font = new System.Drawing.Font("Microsoft Sans Serif", 8.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            dataGridViewCellStyle1.ForeColor = System.Drawing.SystemColors.WindowText;
            dataGridViewCellStyle1.SelectionBackColor = System.Drawing.SystemColors.Highlight;
            dataGridViewCellStyle1.SelectionForeColor = System.Drawing.SystemColors.HighlightText;
            dataGridViewCellStyle1.WrapMode = System.Windows.Forms.DataGridViewTriState.False;
            this.DeploymentGrid.RowHeadersDefaultCellStyle = dataGridViewCellStyle1;
            this.DeploymentGrid.RowHeadersWidth = 27;
            this.DeploymentGrid.RowTemplate.ErrorText = "fuck";
            this.DeploymentGrid.RowTemplate.Height = 3;
            this.DeploymentGrid.RowTemplate.Resizable = System.Windows.Forms.DataGridViewTriState.False;
            this.DeploymentGrid.ShowCellErrors = false;
            this.DeploymentGrid.ShowCellToolTips = false;
            this.DeploymentGrid.ShowEditingIcon = false;
            this.DeploymentGrid.ShowRowErrors = false;
            this.DeploymentGrid.Size = new System.Drawing.Size(344, 381);
            this.DeploymentGrid.TabIndex = 0;
            this.DeploymentGrid.TabStop = false;
            // 
            // DeploymentName
            // 
            this.DeploymentName.AutoSizeMode = System.Windows.Forms.DataGridViewAutoSizeColumnMode.Fill;
            this.DeploymentName.FillWeight = 23F;
            this.DeploymentName.HeaderText = "Name";
            this.DeploymentName.MinimumWidth = 3;
            this.DeploymentName.Name = "DeploymentName";
            this.DeploymentName.ReadOnly = true;
            this.DeploymentName.Resizable = System.Windows.Forms.DataGridViewTriState.False;
            this.DeploymentName.SortMode = System.Windows.Forms.DataGridViewColumnSortMode.Automatic;
            // 
            // Rollbacks
            // 
            this.Rollbacks.Enabled = false;
            this.Rollbacks.Location = new System.Drawing.Point(550, 472);
            this.Rollbacks.Name = "Rollbacks";
            this.Rollbacks.Size = new System.Drawing.Size(350, 313);
            this.Rollbacks.TabIndex = 6;
            this.Rollbacks.TabStop = false;
            this.Rollbacks.Text = "Revert / Rollback target versions";
            // 
            // BuildDirectory
            // 
            this.BuildDirectory.Location = new System.Drawing.Point(12, 10);
            this.BuildDirectory.Name = "BuildDirectory";
            this.BuildDirectory.Size = new System.Drawing.Size(75, 23);
            this.BuildDirectory.TabIndex = 7;
            this.BuildDirectory.Text = "Build Dir";
            this.BuildDirectory.UseVisualStyleBackColor = true;
            this.BuildDirectory.Click += new System.EventHandler(this.BuildDirectory_Click);
            // 
            // IISResetDirectory
            // 
            this.IISResetDirectory.Location = new System.Drawing.Point(12, 39);
            this.IISResetDirectory.Name = "IISResetDirectory";
            this.IISResetDirectory.Size = new System.Drawing.Size(75, 23);
            this.IISResetDirectory.TabIndex = 8;
            this.IISResetDirectory.Text = "IISReset Dir";
            this.IISResetDirectory.UseVisualStyleBackColor = true;
            this.IISResetDirectory.Click += new System.EventHandler(this.IISResetDirectory_Click);
            // 
            // UploaderDirectory
            // 
            this.UploaderDirectory.Location = new System.Drawing.Point(12, 68);
            this.UploaderDirectory.Name = "UploaderDirectory";
            this.UploaderDirectory.Size = new System.Drawing.Size(75, 23);
            this.UploaderDirectory.TabIndex = 9;
            this.UploaderDirectory.Text = "Uploader Dir";
            this.UploaderDirectory.UseVisualStyleBackColor = true;
            this.UploaderDirectory.Click += new System.EventHandler(this.UploaderDirectory_Click);
            // 
            // TemporaryFiles
            // 
            this.TemporaryFiles.Location = new System.Drawing.Point(12, 97);
            this.TemporaryFiles.Name = "TemporaryFiles";
            this.TemporaryFiles.Size = new System.Drawing.Size(75, 23);
            this.TemporaryFiles.TabIndex = 10;
            this.TemporaryFiles.Text = "Temp Files";
            this.TemporaryFiles.UseVisualStyleBackColor = true;
            this.TemporaryFiles.Click += new System.EventHandler(this.TemporaryFiles_Click);
            // 
            // BuildDirectoryText
            // 
            this.BuildDirectoryText.Location = new System.Drawing.Point(94, 12);
            this.BuildDirectoryText.Name = "BuildDirectoryText";
            this.BuildDirectoryText.Size = new System.Drawing.Size(450, 20);
            this.BuildDirectoryText.TabIndex = 11;
            this.BuildDirectoryText.Text = "C:\\Roblox\\Branches\\ClientIntegration\\Client\\";
            // 
            // IISResetDirectoryText
            // 
            this.IISResetDirectoryText.Location = new System.Drawing.Point(94, 40);
            this.IISResetDirectoryText.Name = "IISResetDirectoryText";
            this.IISResetDirectoryText.Size = new System.Drawing.Size(450, 20);
            this.IISResetDirectoryText.TabIndex = 12;
            this.IISResetDirectoryText.Text = "C:\\Roblox\\Branches\\ClientIntegration\\IISReset\\bin\\Release\\IISReset.exe";
            // 
            // UploaderDirectoryText
            // 
            this.UploaderDirectoryText.Location = new System.Drawing.Point(94, 68);
            this.UploaderDirectoryText.Name = "UploaderDirectoryText";
            this.UploaderDirectoryText.Size = new System.Drawing.Size(450, 20);
            this.UploaderDirectoryText.TabIndex = 13;
            this.UploaderDirectoryText.Text = "C:\\Roblox\\Branches\\ClientIntegration\\Uploader\\bin\\Release\\Uploader.exe";
            // 
            // TemporaryFilesText
            // 
            this.TemporaryFilesText.Location = new System.Drawing.Point(94, 100);
            this.TemporaryFilesText.Name = "TemporaryFilesText";
            this.TemporaryFilesText.Size = new System.Drawing.Size(450, 20);
            this.TemporaryFilesText.TabIndex = 14;
            this.TemporaryFilesText.Text = "C:\\Roblox\\Branches\\ClientIntegration\\TempFiles\\";
            // 
            // MD5Hashes
            // 
            this.MD5Hashes.Controls.Add(this.MacMD5HashCurrent);
            this.MD5Hashes.Controls.Add(this.PCMD5HashCurrent);
            this.MD5Hashes.Controls.Add(this.MacMD5HashOld);
            this.MD5Hashes.Controls.Add(this.PCMD5HashOld);
            this.MD5Hashes.Controls.Add(this.MacLabel);
            this.MD5Hashes.Controls.Add(this.PCLabel);
            this.MD5Hashes.Location = new System.Drawing.Point(12, 126);
            this.MD5Hashes.Name = "MD5Hashes";
            this.MD5Hashes.Padding = new System.Windows.Forms.Padding(0);
            this.MD5Hashes.Size = new System.Drawing.Size(532, 66);
            this.MD5Hashes.TabIndex = 5;
            this.MD5Hashes.TabStop = false;
            this.MD5Hashes.Text = "MD5 Hashes (old / current)";
            // 
            // MacMD5HashCurrent
            // 
            this.MacMD5HashCurrent.HideSelection = false;
            this.MacMD5HashCurrent.Location = new System.Drawing.Point(284, 41);
            this.MacMD5HashCurrent.Name = "MacMD5HashCurrent";
            this.MacMD5HashCurrent.ReadOnly = true;
            this.MacMD5HashCurrent.Size = new System.Drawing.Size(236, 20);
            this.MacMD5HashCurrent.TabIndex = 18;
            this.MacMD5HashCurrent.Text = "e1544481252d4990 ";
            // 
            // PCMD5HashCurrent
            // 
            this.PCMD5HashCurrent.HideSelection = false;
            this.PCMD5HashCurrent.Location = new System.Drawing.Point(284, 19);
            this.PCMD5HashCurrent.Name = "PCMD5HashCurrent";
            this.PCMD5HashCurrent.ReadOnly = true;
            this.PCMD5HashCurrent.Size = new System.Drawing.Size(236, 20);
            this.PCMD5HashCurrent.TabIndex = 17;
            this.PCMD5HashCurrent.Text = "6af752c615a14d34 ";
            // 
            // MacMD5HashOld
            // 
            this.MacMD5HashOld.HideSelection = false;
            this.MacMD5HashOld.Location = new System.Drawing.Point(43, 41);
            this.MacMD5HashOld.Name = "MacMD5HashOld";
            this.MacMD5HashOld.ReadOnly = true;
            this.MacMD5HashOld.Size = new System.Drawing.Size(235, 20);
            this.MacMD5HashOld.TabIndex = 16;
            this.MacMD5HashOld.Text = "7d5a5b16f3354346 ";
            // 
            // PCMD5HashOld
            // 
            this.PCMD5HashOld.HideSelection = false;
            this.PCMD5HashOld.Location = new System.Drawing.Point(43, 19);
            this.PCMD5HashOld.Name = "PCMD5HashOld";
            this.PCMD5HashOld.ReadOnly = true;
            this.PCMD5HashOld.Size = new System.Drawing.Size(235, 20);
            this.PCMD5HashOld.TabIndex = 15;
            this.PCMD5HashOld.Text = "34ed881168734450 ";
            // 
            // MacLabel
            // 
            this.MacLabel.AutoSize = true;
            this.MacLabel.Font = new System.Drawing.Font("Microsoft Sans Serif", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.MacLabel.Location = new System.Drawing.Point(6, 42);
            this.MacLabel.Name = "MacLabel";
            this.MacLabel.Size = new System.Drawing.Size(31, 15);
            this.MacLabel.TabIndex = 1;
            this.MacLabel.Text = "Mac";
            // 
            // PCLabel
            // 
            this.PCLabel.AutoSize = true;
            this.PCLabel.Font = new System.Drawing.Font("Microsoft Sans Serif", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.PCLabel.Location = new System.Drawing.Point(5, 19);
            this.PCLabel.Name = "PCLabel";
            this.PCLabel.Size = new System.Drawing.Size(23, 15);
            this.PCLabel.TabIndex = 0;
            this.PCLabel.Text = "PC";
            // 
            // Versions
            // 
            this.Versions.Controls.Add(this.GridAndMegagridVersionNew);
            this.Versions.Controls.Add(this.GridVersionCurrent);
            this.Versions.Controls.Add(this.PCClientBootstrapperVersionNew);
            this.Versions.Controls.Add(this.PCClientMFCVersionNew);
            this.Versions.Controls.Add(this.MacStudioVersionNew);
            this.Versions.Controls.Add(this.MacClientVersionNew);
            this.Versions.Controls.Add(this.RCCServiceVersionNew);
            this.Versions.Controls.Add(this.MegagridLabel);
            this.Versions.Controls.Add(this.GridLabel);
            this.Versions.Controls.Add(this.PCClientBootstapperLabel);
            this.Versions.Controls.Add(this.PCClientMFCLabel);
            this.Versions.Controls.Add(this.MacStudioLabel);
            this.Versions.Controls.Add(this.MacClientLabel);
            this.Versions.Controls.Add(this.RCCServiceLabel);
            this.Versions.Controls.Add(this.NewVersionLabel);
            this.Versions.Controls.Add(this.CurrentVersionsLabel);
            this.Versions.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.Versions.Location = new System.Drawing.Point(12, 193);
            this.Versions.Name = "Versions";
            this.Versions.Padding = new System.Windows.Forms.Padding(0);
            this.Versions.Size = new System.Drawing.Size(270, 205);
            this.Versions.TabIndex = 19;
            this.Versions.TabStop = false;
            this.Versions.Text = "Versions";
            // 
            // GridAndMegagridVersionNew
            // 
            this.GridAndMegagridVersionNew.HideSelection = false;
            this.GridAndMegagridVersionNew.Location = new System.Drawing.Point(175, 159);
            this.GridAndMegagridVersionNew.Name = "GridAndMegagridVersionNew";
            this.GridAndMegagridVersionNew.Size = new System.Drawing.Size(88, 20);
            this.GridAndMegagridVersionNew.TabIndex = 25;
            this.GridAndMegagridVersionNew.Text = "0, 225, 0, 68137";
            // 
            // GridVersionCurrent
            // 
            this.GridVersionCurrent.HideSelection = false;
            this.GridVersionCurrent.Location = new System.Drawing.Point(82, 145);
            this.GridVersionCurrent.Name = "GridVersionCurrent";
            this.GridVersionCurrent.ReadOnly = true;
            this.GridVersionCurrent.Size = new System.Drawing.Size(88, 20);
            this.GridVersionCurrent.TabIndex = 24;
            this.GridVersionCurrent.Text = "0, 225, 0, 68221";
            // 
            // PCClientBootstrapperVersionNew
            // 
            this.PCClientBootstrapperVersionNew.HideSelection = false;
            this.PCClientBootstrapperVersionNew.Location = new System.Drawing.Point(175, 119);
            this.PCClientBootstrapperVersionNew.Name = "PCClientBootstrapperVersionNew";
            this.PCClientBootstrapperVersionNew.ReadOnly = true;
            this.PCClientBootstrapperVersionNew.Size = new System.Drawing.Size(88, 20);
            this.PCClientBootstrapperVersionNew.TabIndex = 23;
            this.PCClientBootstrapperVersionNew.Text = "0, 226, 0, 68137";
            // 
            // PCClientMFCVersionNew
            // 
            this.PCClientMFCVersionNew.HideSelection = false;
            this.PCClientMFCVersionNew.Location = new System.Drawing.Point(175, 93);
            this.PCClientMFCVersionNew.Name = "PCClientMFCVersionNew";
            this.PCClientMFCVersionNew.ReadOnly = true;
            this.PCClientMFCVersionNew.Size = new System.Drawing.Size(88, 20);
            this.PCClientMFCVersionNew.TabIndex = 22;
            this.PCClientMFCVersionNew.Text = "0, 226, 0, 67999";
            // 
            // MacStudioVersionNew
            // 
            this.MacStudioVersionNew.HideSelection = false;
            this.MacStudioVersionNew.Location = new System.Drawing.Point(175, 67);
            this.MacStudioVersionNew.Name = "MacStudioVersionNew";
            this.MacStudioVersionNew.ReadOnly = true;
            this.MacStudioVersionNew.Size = new System.Drawing.Size(88, 20);
            this.MacStudioVersionNew.TabIndex = 21;
            this.MacStudioVersionNew.Text = "0, 225, 0, 67689";
            // 
            // MacClientVersionNew
            // 
            this.MacClientVersionNew.HideSelection = false;
            this.MacClientVersionNew.Location = new System.Drawing.Point(175, 41);
            this.MacClientVersionNew.Name = "MacClientVersionNew";
            this.MacClientVersionNew.ReadOnly = true;
            this.MacClientVersionNew.Size = new System.Drawing.Size(88, 20);
            this.MacClientVersionNew.TabIndex = 20;
            this.MacClientVersionNew.Text = "0, 225, 0, 67689";
            // 
            // RCCServiceVersionNew
            // 
            this.RCCServiceVersionNew.HideSelection = false;
            this.RCCServiceVersionNew.Location = new System.Drawing.Point(175, 15);
            this.RCCServiceVersionNew.Name = "RCCServiceVersionNew";
            this.RCCServiceVersionNew.ReadOnly = true;
            this.RCCServiceVersionNew.Size = new System.Drawing.Size(88, 20);
            this.RCCServiceVersionNew.TabIndex = 19;
            this.RCCServiceVersionNew.Text = "0, 226, 0, 67999";
            // 
            // MegagridLabel
            // 
            this.MegagridLabel.AutoSize = true;
            this.MegagridLabel.Font = new System.Drawing.Font("Microsoft Sans Serif", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.MegagridLabel.Location = new System.Drawing.Point(5, 176);
            this.MegagridLabel.Name = "MegagridLabel";
            this.MegagridLabel.Size = new System.Drawing.Size(60, 15);
            this.MegagridLabel.TabIndex = 8;
            this.MegagridLabel.Text = "Megagrid";
            // 
            // GridLabel
            // 
            this.GridLabel.AutoSize = true;
            this.GridLabel.Font = new System.Drawing.Font("Microsoft Sans Serif", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.GridLabel.Location = new System.Drawing.Point(5, 150);
            this.GridLabel.Name = "GridLabel";
            this.GridLabel.Size = new System.Drawing.Size(30, 15);
            this.GridLabel.TabIndex = 7;
            this.GridLabel.Text = "Grid";
            // 
            // PCClientBootstapperLabel
            // 
            this.PCClientBootstapperLabel.AutoSize = true;
            this.PCClientBootstapperLabel.Font = new System.Drawing.Font("Microsoft Sans Serif", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.PCClientBootstapperLabel.Location = new System.Drawing.Point(4, 124);
            this.PCClientBootstapperLabel.Name = "PCClientBootstapperLabel";
            this.PCClientBootstapperLabel.Size = new System.Drawing.Size(130, 15);
            this.PCClientBootstapperLabel.TabIndex = 6;
            this.PCClientBootstapperLabel.Text = "PC Client Bootstrapper";
            // 
            // PCClientMFCLabel
            // 
            this.PCClientMFCLabel.AutoSize = true;
            this.PCClientMFCLabel.Font = new System.Drawing.Font("Microsoft Sans Serif", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.PCClientMFCLabel.Location = new System.Drawing.Point(3, 98);
            this.PCClientMFCLabel.Name = "PCClientMFCLabel";
            this.PCClientMFCLabel.Size = new System.Drawing.Size(136, 15);
            this.PCClientMFCLabel.TabIndex = 5;
            this.PCClientMFCLabel.Text = "PC Client (Legacy MFC)";
            // 
            // MacStudioLabel
            // 
            this.MacStudioLabel.AutoSize = true;
            this.MacStudioLabel.Font = new System.Drawing.Font("Microsoft Sans Serif", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.MacStudioLabel.Location = new System.Drawing.Point(5, 72);
            this.MacStudioLabel.Name = "MacStudioLabel";
            this.MacStudioLabel.Size = new System.Drawing.Size(69, 15);
            this.MacStudioLabel.TabIndex = 4;
            this.MacStudioLabel.Text = "Mac Studio";
            // 
            // MacClientLabel
            // 
            this.MacClientLabel.AutoSize = true;
            this.MacClientLabel.Font = new System.Drawing.Font("Microsoft Sans Serif", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.MacClientLabel.Location = new System.Drawing.Point(5, 46);
            this.MacClientLabel.Name = "MacClientLabel";
            this.MacClientLabel.Size = new System.Drawing.Size(65, 15);
            this.MacClientLabel.TabIndex = 3;
            this.MacClientLabel.Text = "Mac Client";
            // 
            // RCCServiceLabel
            // 
            this.RCCServiceLabel.AutoSize = true;
            this.RCCServiceLabel.Font = new System.Drawing.Font("Microsoft Sans Serif", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.RCCServiceLabel.Location = new System.Drawing.Point(4, 20);
            this.RCCServiceLabel.Name = "RCCServiceLabel";
            this.RCCServiceLabel.Size = new System.Drawing.Size(72, 15);
            this.RCCServiceLabel.TabIndex = 2;
            this.RCCServiceLabel.Text = "RCCService";
            // 
            // NewVersionLabel
            // 
            this.NewVersionLabel.AutoSize = true;
            this.NewVersionLabel.Location = new System.Drawing.Point(200, 0);
            this.NewVersionLabel.Name = "NewVersionLabel";
            this.NewVersionLabel.Size = new System.Drawing.Size(29, 13);
            this.NewVersionLabel.TabIndex = 1;
            this.NewVersionLabel.Text = "New";
            // 
            // CurrentVersionsLabel
            // 
            this.CurrentVersionsLabel.AutoSize = true;
            this.CurrentVersionsLabel.Location = new System.Drawing.Point(98, 0);
            this.CurrentVersionsLabel.Name = "CurrentVersionsLabel";
            this.CurrentVersionsLabel.Size = new System.Drawing.Size(41, 13);
            this.CurrentVersionsLabel.TabIndex = 0;
            this.CurrentVersionsLabel.Text = "Current";
            // 
            // MegagridVersionCurrent
            // 
            this.MegagridVersionCurrent.HideSelection = false;
            this.MegagridVersionCurrent.Location = new System.Drawing.Point(94, 369);
            this.MegagridVersionCurrent.Name = "MegagridVersionCurrent";
            this.MegagridVersionCurrent.ReadOnly = true;
            this.MegagridVersionCurrent.Size = new System.Drawing.Size(88, 20);
            this.MegagridVersionCurrent.TabIndex = 25;
            this.MegagridVersionCurrent.Text = "0, 225, 0, 68871";
            // 
            // BuildConfiguration
            // 
            this.BuildConfiguration.Controls.Add(this.BuildConfigurationDropdown);
            this.BuildConfiguration.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.BuildConfiguration.Location = new System.Drawing.Point(288, 244);
            this.BuildConfiguration.Name = "BuildConfiguration";
            this.BuildConfiguration.Padding = new System.Windows.Forms.Padding(0);
            this.BuildConfiguration.Size = new System.Drawing.Size(182, 51);
            this.BuildConfiguration.TabIndex = 26;
            this.BuildConfiguration.TabStop = false;
            this.BuildConfiguration.Text = "Build configuration";
            // 
            // BuildConfigurationDropdown
            // 
            this.BuildConfigurationDropdown.FormattingEnabled = true;
            this.BuildConfigurationDropdown.Items.AddRange(new object[] {
            "Release",
            "Debug",
            "Test",
            "NoOpt"});
            this.BuildConfigurationDropdown.Location = new System.Drawing.Point(8, 20);
            this.BuildConfigurationDropdown.MaxDropDownItems = 4;
            this.BuildConfigurationDropdown.Name = "BuildConfigurationDropdown";
            this.BuildConfigurationDropdown.Size = new System.Drawing.Size(164, 21);
            this.BuildConfigurationDropdown.TabIndex = 0;
            this.BuildConfigurationDropdown.Text = "Release";
            // 
            // BuildMachines
            // 
            this.BuildMachines.AllowUserToAddRows = false;
            this.BuildMachines.AllowUserToDeleteRows = false;
            this.BuildMachines.AllowUserToResizeColumns = false;
            this.BuildMachines.AllowUserToResizeRows = false;
            this.BuildMachines.BackgroundColor = System.Drawing.SystemColors.ButtonHighlight;
            this.BuildMachines.CausesValidation = false;
            this.BuildMachines.ClipboardCopyMode = System.Windows.Forms.DataGridViewClipboardCopyMode.Disable;
            this.BuildMachines.ColumnHeadersHeight = 20;
            this.BuildMachines.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.DisableResizing;
            this.BuildMachines.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.BuildIP,
            this.BuildCores,
            this.BuildEnviornmentCount});
            this.BuildMachines.EditMode = System.Windows.Forms.DataGridViewEditMode.EditOnEnter;
            this.BuildMachines.GridColor = System.Drawing.SystemColors.Control;
            this.BuildMachines.ImeMode = System.Windows.Forms.ImeMode.On;
            this.BuildMachines.Location = new System.Drawing.Point(288, 301);
            this.BuildMachines.Name = "BuildMachines";
            this.BuildMachines.ReadOnly = true;
            this.BuildMachines.RowHeadersBorderStyle = System.Windows.Forms.DataGridViewHeaderBorderStyle.None;
            dataGridViewCellStyle2.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle2.BackColor = System.Drawing.SystemColors.Control;
            dataGridViewCellStyle2.Font = new System.Drawing.Font("Microsoft Sans Serif", 8.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            dataGridViewCellStyle2.ForeColor = System.Drawing.SystemColors.WindowText;
            dataGridViewCellStyle2.SelectionBackColor = System.Drawing.SystemColors.Highlight;
            dataGridViewCellStyle2.SelectionForeColor = System.Drawing.SystemColors.HighlightText;
            dataGridViewCellStyle2.WrapMode = System.Windows.Forms.DataGridViewTriState.False;
            this.BuildMachines.RowHeadersDefaultCellStyle = dataGridViewCellStyle2;
            this.BuildMachines.RowHeadersWidth = 27;
            this.BuildMachines.RowTemplate.ErrorText = "fuck";
            this.BuildMachines.RowTemplate.Height = 3;
            this.BuildMachines.RowTemplate.Resizable = System.Windows.Forms.DataGridViewTriState.False;
            this.BuildMachines.ShowCellErrors = false;
            this.BuildMachines.ShowCellToolTips = false;
            this.BuildMachines.ShowEditingIcon = false;
            this.BuildMachines.ShowRowErrors = false;
            this.BuildMachines.Size = new System.Drawing.Size(231, 297);
            this.BuildMachines.TabIndex = 1;
            this.BuildMachines.TabStop = false;
            // 
            // BuildIP
            // 
            this.BuildIP.FillWeight = 23F;
            this.BuildIP.HeaderText = "IP";
            this.BuildIP.MinimumWidth = 3;
            this.BuildIP.Name = "BuildIP";
            this.BuildIP.ReadOnly = true;
            this.BuildIP.Resizable = System.Windows.Forms.DataGridViewTriState.False;
            this.BuildIP.SortMode = System.Windows.Forms.DataGridViewColumnSortMode.Automatic;
            this.BuildIP.Width = 80;
            // 
            // BuildCores
            // 
            this.BuildCores.HeaderText = "Cores";
            this.BuildCores.Name = "BuildCores";
            this.BuildCores.ReadOnly = true;
            this.BuildCores.Width = 55;
            // 
            // BuildEnviornmentCount
            // 
            this.BuildEnviornmentCount.AutoSizeMode = System.Windows.Forms.DataGridViewAutoSizeColumnMode.Fill;
            this.BuildEnviornmentCount.HeaderText = "EnvCount";
            this.BuildEnviornmentCount.Name = "BuildEnviornmentCount";
            this.BuildEnviornmentCount.ReadOnly = true;
            // 
            // Steps
            // 
            this.Steps.Controls.Add(this.ConfirmAllActions);
            this.Steps.Controls.Add(this.UpgradeGrid);
            this.Steps.Controls.Add(this.RunIISReset);
            this.Steps.Controls.Add(this.SignBinaries);
            this.Steps.Controls.Add(this.ShutdownGames);
            this.Steps.Controls.Add(this.UpdateMD5Hash);
            this.Steps.Controls.Add(this.RunUploader);
            this.Steps.Controls.Add(this.All);
            this.Steps.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.Steps.Location = new System.Drawing.Point(12, 404);
            this.Steps.Name = "Steps";
            this.Steps.Padding = new System.Windows.Forms.Padding(0);
            this.Steps.Size = new System.Drawing.Size(270, 117);
            this.Steps.TabIndex = 26;
            this.Steps.TabStop = false;
            this.Steps.Text = "Steps";
            // 
            // ConfirmAllActions
            // 
            this.ConfirmAllActions.AutoSize = true;
            this.ConfirmAllActions.Enabled = false;
            this.ConfirmAllActions.Location = new System.Drawing.Point(149, 89);
            this.ConfirmAllActions.Name = "ConfirmAllActions";
            this.ConfirmAllActions.Size = new System.Drawing.Size(113, 17);
            this.ConfirmAllActions.TabIndex = 7;
            this.ConfirmAllActions.Text = "Confirm All Actions";
            this.ConfirmAllActions.UseVisualStyleBackColor = true;
            // 
            // UpgradeGrid
            // 
            this.UpgradeGrid.AutoSize = true;
            this.UpgradeGrid.Enabled = false;
            this.UpgradeGrid.Location = new System.Drawing.Point(149, 66);
            this.UpgradeGrid.Name = "UpgradeGrid";
            this.UpgradeGrid.Size = new System.Drawing.Size(89, 17);
            this.UpgradeGrid.TabIndex = 6;
            this.UpgradeGrid.Text = "Upgrade Grid";
            this.UpgradeGrid.UseVisualStyleBackColor = true;
            // 
            // RunIISReset
            // 
            this.RunIISReset.AutoSize = true;
            this.RunIISReset.Enabled = false;
            this.RunIISReset.Location = new System.Drawing.Point(149, 43);
            this.RunIISReset.Name = "RunIISReset";
            this.RunIISReset.Size = new System.Drawing.Size(90, 17);
            this.RunIISReset.TabIndex = 5;
            this.RunIISReset.Text = "Run IISReset";
            this.RunIISReset.UseVisualStyleBackColor = true;
            // 
            // SignBinaries
            // 
            this.SignBinaries.AutoSize = true;
            this.SignBinaries.Enabled = false;
            this.SignBinaries.Location = new System.Drawing.Point(149, 20);
            this.SignBinaries.Name = "SignBinaries";
            this.SignBinaries.Size = new System.Drawing.Size(87, 17);
            this.SignBinaries.TabIndex = 4;
            this.SignBinaries.Text = "Sign Binaries";
            this.SignBinaries.UseVisualStyleBackColor = true;
            // 
            // ShutdownGames
            // 
            this.ShutdownGames.AutoSize = true;
            this.ShutdownGames.Enabled = false;
            this.ShutdownGames.Location = new System.Drawing.Point(8, 89);
            this.ShutdownGames.Name = "ShutdownGames";
            this.ShutdownGames.Size = new System.Drawing.Size(110, 17);
            this.ShutdownGames.TabIndex = 3;
            this.ShutdownGames.Text = "Shutdown Games";
            this.ShutdownGames.UseVisualStyleBackColor = true;
            // 
            // UpdateMD5Hash
            // 
            this.UpdateMD5Hash.AutoSize = true;
            this.UpdateMD5Hash.Checked = true;
            this.UpdateMD5Hash.CheckState = System.Windows.Forms.CheckState.Checked;
            this.UpdateMD5Hash.Location = new System.Drawing.Point(8, 66);
            this.UpdateMD5Hash.Name = "UpdateMD5Hash";
            this.UpdateMD5Hash.Size = new System.Drawing.Size(115, 17);
            this.UpdateMD5Hash.TabIndex = 2;
            this.UpdateMD5Hash.Text = "Update MD5 Hash";
            this.UpdateMD5Hash.UseVisualStyleBackColor = true;
            // 
            // RunUploader
            // 
            this.RunUploader.AutoSize = true;
            this.RunUploader.Checked = true;
            this.RunUploader.CheckState = System.Windows.Forms.CheckState.Checked;
            this.RunUploader.Location = new System.Drawing.Point(8, 43);
            this.RunUploader.Name = "RunUploader";
            this.RunUploader.Size = new System.Drawing.Size(92, 17);
            this.RunUploader.TabIndex = 1;
            this.RunUploader.Text = "Run Uploader";
            this.RunUploader.UseVisualStyleBackColor = true;
            // 
            // All
            // 
            this.All.AutoSize = true;
            this.All.Checked = true;
            this.All.CheckState = System.Windows.Forms.CheckState.Checked;
            this.All.Location = new System.Drawing.Point(8, 20);
            this.All.Name = "All";
            this.All.Size = new System.Drawing.Size(37, 17);
            this.All.TabIndex = 0;
            this.All.Text = "All";
            this.All.UseVisualStyleBackColor = true;
            // 
            // GridUpgrade
            // 
            this.GridUpgrade.Controls.Add(this.SelectAll);
            this.GridUpgrade.Controls.Add(this.StagedProductionDeploy);
            this.GridUpgrade.Controls.Add(this.UseGrdBalancer);
            this.GridUpgrade.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.GridUpgrade.Location = new System.Drawing.Point(12, 527);
            this.GridUpgrade.Name = "GridUpgrade";
            this.GridUpgrade.Padding = new System.Windows.Forms.Padding(0);
            this.GridUpgrade.Size = new System.Drawing.Size(270, 71);
            this.GridUpgrade.TabIndex = 27;
            this.GridUpgrade.TabStop = false;
            this.GridUpgrade.Text = "Grid upgrade";
            // 
            // SelectAll
            // 
            this.SelectAll.AutoSize = true;
            this.SelectAll.Enabled = false;
            this.SelectAll.Location = new System.Drawing.Point(149, 20);
            this.SelectAll.Name = "SelectAll";
            this.SelectAll.Size = new System.Drawing.Size(69, 17);
            this.SelectAll.TabIndex = 4;
            this.SelectAll.Text = "Select all";
            this.SelectAll.UseVisualStyleBackColor = true;
            // 
            // StagedProductionDeploy
            // 
            this.StagedProductionDeploy.AutoSize = true;
            this.StagedProductionDeploy.Enabled = false;
            this.StagedProductionDeploy.Location = new System.Drawing.Point(8, 43);
            this.StagedProductionDeploy.Name = "StagedProductionDeploy";
            this.StagedProductionDeploy.Size = new System.Drawing.Size(150, 17);
            this.StagedProductionDeploy.TabIndex = 1;
            this.StagedProductionDeploy.Text = "Staged Production Deploy";
            this.StagedProductionDeploy.UseVisualStyleBackColor = true;
            // 
            // UseGrdBalancer
            // 
            this.UseGrdBalancer.AutoSize = true;
            this.UseGrdBalancer.Enabled = false;
            this.UseGrdBalancer.Location = new System.Drawing.Point(8, 20);
            this.UseGrdBalancer.Name = "UseGrdBalancer";
            this.UseGrdBalancer.Size = new System.Drawing.Size(112, 17);
            this.UseGrdBalancer.TabIndex = 0;
            this.UseGrdBalancer.Text = "Use Grid Balancer";
            this.UseGrdBalancer.UseVisualStyleBackColor = true;
            // 
            // DeployProgress
            // 
            this.DeployProgress.Enabled = false;
            this.DeployProgress.Location = new System.Drawing.Point(14, 618);
            this.DeployProgress.Name = "DeployProgress";
            this.DeployProgress.Size = new System.Drawing.Size(315, 23);
            this.DeployProgress.TabIndex = 28;
            // 
            // DeployButton
            // 
            this.DeployButton.Enabled = false;
            this.DeployButton.Font = new System.Drawing.Font("Microsoft Sans Serif", 10F);
            this.DeployButton.Location = new System.Drawing.Point(382, 605);
            this.DeployButton.Name = "DeployButton";
            this.DeployButton.Size = new System.Drawing.Size(137, 35);
            this.DeployButton.TabIndex = 29;
            this.DeployButton.Text = "Deploy";
            this.DeployButton.UseVisualStyleBackColor = true;
            this.DeployButton.Click += new System.EventHandler(this.DeployButton_Click);
            // 
            // KillButton
            // 
            this.KillButton.Enabled = false;
            this.KillButton.Font = new System.Drawing.Font("Microsoft Sans Serif", 8.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.KillButton.Location = new System.Drawing.Point(335, 605);
            this.KillButton.Name = "KillButton";
            this.KillButton.Size = new System.Drawing.Size(41, 35);
            this.KillButton.TabIndex = 30;
            this.KillButton.Text = "Kill it!";
            this.KillButton.UseVisualStyleBackColor = true;
            // 
            // Output
            // 
            this.Output.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.Output.DrawMode = System.Windows.Forms.DrawMode.OwnerDrawFixed;
            this.Output.Enabled = false;
            this.Output.FormattingEnabled = true;
            this.Output.ImeMode = System.Windows.Forms.ImeMode.On;
            this.Output.IntegralHeight = false;
            this.Output.Location = new System.Drawing.Point(12, 647);
            this.Output.Name = "Output";
            this.Output.ScrollAlwaysVisible = true;
            this.Output.SelectionMode = System.Windows.Forms.SelectionMode.None;
            this.Output.Size = new System.Drawing.Size(520, 140);
            this.Output.Sorted = true;
            this.Output.TabIndex = 31;
            this.Output.TabStop = false;
            this.Output.UseTabStops = false;
            // 
            // MainWindow
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.AutoValidate = System.Windows.Forms.AutoValidate.Disable;
            this.ClientSize = new System.Drawing.Size(911, 789);
            this.Controls.Add(this.Output);
            this.Controls.Add(this.KillButton);
            this.Controls.Add(this.DeployButton);
            this.Controls.Add(this.DeployProgress);
            this.Controls.Add(this.GridUpgrade);
            this.Controls.Add(this.Steps);
            this.Controls.Add(this.BuildMachines);
            this.Controls.Add(this.BuildConfiguration);
            this.Controls.Add(this.MegagridVersionCurrent);
            this.Controls.Add(this.Versions);
            this.Controls.Add(this.MD5Hashes);
            this.Controls.Add(this.TemporaryFilesText);
            this.Controls.Add(this.UploaderDirectoryText);
            this.Controls.Add(this.IISResetDirectoryText);
            this.Controls.Add(this.BuildDirectoryText);
            this.Controls.Add(this.TemporaryFiles);
            this.Controls.Add(this.UploaderDirectory);
            this.Controls.Add(this.IISResetDirectory);
            this.Controls.Add(this.BuildDirectory);
            this.Controls.Add(this.Rollbacks);
            this.Controls.Add(this.Deployments);
            this.Controls.Add(this.OperationType);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedDialog;
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.MaximizeBox = false;
            this.MaximumSize = new System.Drawing.Size(927, 828);
            this.MinimumSize = new System.Drawing.Size(927, 828);
            this.Name = "MainWindow";
            this.StartPosition = System.Windows.Forms.FormStartPosition.Manual;
            this.Text = "Client Release Automated Contraption";
            this.OperationType.ResumeLayout(false);
            this.OperationType.PerformLayout();
            this.Deployments.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.DeploymentGrid)).EndInit();
            this.MD5Hashes.ResumeLayout(false);
            this.MD5Hashes.PerformLayout();
            this.Versions.ResumeLayout(false);
            this.Versions.PerformLayout();
            this.BuildConfiguration.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.BuildMachines)).EndInit();
            this.Steps.ResumeLayout(false);
            this.Steps.PerformLayout();
            this.GridUpgrade.ResumeLayout(false);
            this.GridUpgrade.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.GroupBox OperationType;
        private System.Windows.Forms.RadioButton RevertRadioButton;
        private System.Windows.Forms.RadioButton DeployRadioButton;
        private System.Windows.Forms.GroupBox Deployments;
        private System.Windows.Forms.DataGridView DeploymentGrid;
        private System.Windows.Forms.GroupBox Rollbacks;
        private System.Windows.Forms.Button BuildDirectory;
        private System.Windows.Forms.Button IISResetDirectory;
        private System.Windows.Forms.Button UploaderDirectory;
        private System.Windows.Forms.Button TemporaryFiles;
        private System.Windows.Forms.TextBox BuildDirectoryText;
        private System.Windows.Forms.TextBox IISResetDirectoryText;
        private System.Windows.Forms.TextBox UploaderDirectoryText;
        private System.Windows.Forms.TextBox TemporaryFilesText;
        private System.Windows.Forms.GroupBox MD5Hashes;
        private System.Windows.Forms.TextBox MacMD5HashCurrent;
        private System.Windows.Forms.TextBox PCMD5HashCurrent;
        private System.Windows.Forms.TextBox MacMD5HashOld;
        private System.Windows.Forms.TextBox PCMD5HashOld;
        private System.Windows.Forms.Label MacLabel;
        private System.Windows.Forms.Label PCLabel;
        private System.Windows.Forms.GroupBox Versions;
        private System.Windows.Forms.Label NewVersionLabel;
        private System.Windows.Forms.Label CurrentVersionsLabel;
        private System.Windows.Forms.TextBox GridAndMegagridVersionNew;
        private System.Windows.Forms.TextBox GridVersionCurrent;
        private System.Windows.Forms.TextBox PCClientBootstrapperVersionNew;
        private System.Windows.Forms.TextBox PCClientMFCVersionNew;
        private System.Windows.Forms.TextBox MacStudioVersionNew;
        private System.Windows.Forms.TextBox MacClientVersionNew;
        private System.Windows.Forms.TextBox RCCServiceVersionNew;
        private System.Windows.Forms.Label MegagridLabel;
        private System.Windows.Forms.Label GridLabel;
        private System.Windows.Forms.Label PCClientBootstapperLabel;
        private System.Windows.Forms.Label PCClientMFCLabel;
        private System.Windows.Forms.Label MacStudioLabel;
        private System.Windows.Forms.Label MacClientLabel;
        private System.Windows.Forms.Label RCCServiceLabel;
        private System.Windows.Forms.TextBox MegagridVersionCurrent;
        private System.Windows.Forms.GroupBox BuildConfiguration;
        private System.Windows.Forms.ComboBox BuildConfigurationDropdown;
        private System.Windows.Forms.DataGridView BuildMachines;
        private System.Windows.Forms.GroupBox Steps;
        private System.Windows.Forms.CheckBox ConfirmAllActions;
        private System.Windows.Forms.CheckBox UpgradeGrid;
        private System.Windows.Forms.CheckBox RunIISReset;
        private System.Windows.Forms.CheckBox SignBinaries;
        private System.Windows.Forms.CheckBox ShutdownGames;
        private System.Windows.Forms.CheckBox UpdateMD5Hash;
        private System.Windows.Forms.CheckBox RunUploader;
        private System.Windows.Forms.CheckBox All;
        private System.Windows.Forms.GroupBox GridUpgrade;
        private System.Windows.Forms.CheckBox SelectAll;
        private System.Windows.Forms.CheckBox StagedProductionDeploy;
        private System.Windows.Forms.CheckBox UseGrdBalancer;
        private System.Windows.Forms.ProgressBar DeployProgress;
        private System.Windows.Forms.Button DeployButton;
        private System.Windows.Forms.Button KillButton;
        private System.Windows.Forms.ListBox Output;
        private System.Windows.Forms.DataGridViewButtonColumn DeploymentName;
        private System.Windows.Forms.DataGridViewButtonColumn BuildIP;
        private System.Windows.Forms.DataGridViewTextBoxColumn BuildCores;
        private System.Windows.Forms.DataGridViewTextBoxColumn BuildEnviornmentCount;
    }
}

