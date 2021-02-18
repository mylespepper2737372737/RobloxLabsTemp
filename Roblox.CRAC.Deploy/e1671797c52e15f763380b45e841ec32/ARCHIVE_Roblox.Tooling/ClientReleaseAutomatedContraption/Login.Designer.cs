
namespace CRAC
{
    partial class Login
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
            this.DeployToLabel = new System.Windows.Forms.Label();
            this.DeployTo = new System.Windows.Forms.ComboBox();
            this.UserNameLabel = new System.Windows.Forms.Label();
            this.PasswordLabel = new System.Windows.Forms.Label();
            this.UserName = new System.Windows.Forms.TextBox();
            this.Password = new System.Windows.Forms.TextBox();
            this.LoginButton = new System.Windows.Forms.Button();
            this.SkipButton = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // DeployToLabel
            // 
            this.DeployToLabel.Location = new System.Drawing.Point(12, 9);
            this.DeployToLabel.Name = "DeployToLabel";
            this.DeployToLabel.Size = new System.Drawing.Size(186, 20);
            this.DeployToLabel.TabIndex = 1;
            this.DeployToLabel.Text = "Deploy to:";
            this.DeployToLabel.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // DeployTo
            // 
            this.DeployTo.AllowDrop = true;
            this.DeployTo.BackColor = System.Drawing.SystemColors.HighlightText;
            this.DeployTo.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.DeployTo.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.DeployTo.FormattingEnabled = true;
            this.DeployTo.ImeMode = System.Windows.Forms.ImeMode.Off;
            this.DeployTo.IntegralHeight = false;
            this.DeployTo.Items.AddRange(new object[] {
            "AlexBlack",
            "GameTest1",
            "GameTest2",
            "GameTest3",
            "GameTest4",
            "GameTest5",
            "JackDane",
            "OpsTest1",
            "ROBLOX",
            "RoseMary",
            "SiteTest1",
            "SiteTest2",
            "SiteTest3",
            "SiteTest4"});
            this.DeployTo.Location = new System.Drawing.Point(12, 32);
            this.DeployTo.Name = "DeployTo";
            this.DeployTo.Size = new System.Drawing.Size(186, 21);
            this.DeployTo.TabIndex = 2;
            this.DeployTo.TabStop = false;
            // 
            // UserNameLabel
            // 
            this.UserNameLabel.Location = new System.Drawing.Point(12, 56);
            this.UserNameLabel.Name = "UserNameLabel";
            this.UserNameLabel.Size = new System.Drawing.Size(186, 20);
            this.UserNameLabel.TabIndex = 3;
            this.UserNameLabel.Text = "User Name:";
            this.UserNameLabel.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // PasswordLabel
            // 
            this.PasswordLabel.Location = new System.Drawing.Point(12, 99);
            this.PasswordLabel.Name = "PasswordLabel";
            this.PasswordLabel.Size = new System.Drawing.Size(186, 20);
            this.PasswordLabel.TabIndex = 5;
            this.PasswordLabel.Text = "Password:";
            this.PasswordLabel.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // UserName
            // 
            this.UserName.Location = new System.Drawing.Point(12, 80);
            this.UserName.Name = "UserName";
            this.UserName.Size = new System.Drawing.Size(186, 20);
            this.UserName.TabIndex = 6;
            this.UserName.Text = "roblox";
            // 
            // Password
            // 
            this.Password.Location = new System.Drawing.Point(12, 122);
            this.Password.Name = "Password";
            this.Password.Size = new System.Drawing.Size(186, 20);
            this.Password.TabIndex = 7;
            // 
            // LoginButton
            // 
            this.LoginButton.Location = new System.Drawing.Point(12, 148);
            this.LoginButton.Name = "LoginButton";
            this.LoginButton.Size = new System.Drawing.Size(90, 23);
            this.LoginButton.TabIndex = 8;
            this.LoginButton.Text = "Log In";
            this.LoginButton.UseVisualStyleBackColor = true;
            // 
            // SkipButton
            // 
            this.SkipButton.Location = new System.Drawing.Point(108, 148);
            this.SkipButton.Name = "SkipButton";
            this.SkipButton.Size = new System.Drawing.Size(90, 23);
            this.SkipButton.TabIndex = 9;
            this.SkipButton.Text = "Skip";
            this.SkipButton.UseVisualStyleBackColor = true;
            // 
            // Login
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(210, 179);
            this.Controls.Add(this.SkipButton);
            this.Controls.Add(this.LoginButton);
            this.Controls.Add(this.Password);
            this.Controls.Add(this.UserName);
            this.Controls.Add(this.PasswordLabel);
            this.Controls.Add(this.UserNameLabel);
            this.Controls.Add(this.DeployTo);
            this.Controls.Add(this.DeployToLabel);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedToolWindow;
            this.Name = "Login";
            this.Text = "Log in to grid machine";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label DeployToLabel;
        private System.Windows.Forms.ComboBox DeployTo;
        private System.Windows.Forms.Label UserNameLabel;
        private System.Windows.Forms.Label PasswordLabel;
        private System.Windows.Forms.TextBox UserName;
        private System.Windows.Forms.TextBox Password;
        private System.Windows.Forms.Button LoginButton;
        private System.Windows.Forms.Button SkipButton;
    }
}