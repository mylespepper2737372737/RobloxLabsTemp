using System;
using System.Text;
using System.Windows.Forms;

namespace CRAC
{
    public partial class MainWindow : Form
    {
        private Login login;
        public MainWindow()
        {
            login = new Login
            {
                Visible = false
            };
            InitializeComponent();
        }

        private void DeployButton_Click(object sender, EventArgs e)
        {
            if (login.IsDisposed) login = new Login();
            login.Visible = !login.Visible;
        }

        private void BuildDirectory_Click(object sender, EventArgs e)
        {
            using (var fbd = new FolderBrowserDialog())
            {
                DialogResult res = fbd.ShowDialog();

                if (res == DialogResult.OK && !String.IsNullOrWhiteSpace(fbd.SelectedPath))
                {
                    BuildDirectoryText.Text = fbd.SelectedPath;
                    DeployButton.Enabled = TemporaryFilesText.Text.Length > 0 && UploaderDirectoryText.Text.Length > 0 && IISResetDirectoryText.Text.Length > 0 && BuildDirectoryText.Text.Length > 0;
                    KillButton.Enabled = TemporaryFilesText.Text.Length > 0 && UploaderDirectoryText.Text.Length > 0 && IISResetDirectoryText.Text.Length > 0 && BuildDirectoryText.Text.Length > 0;
                }
            }
        }

        private void IISResetDirectory_Click(object sender, EventArgs e)
        {
            using (var fbd = new OpenFileDialog())
            {
                fbd.Filter = "Executable Files (*.exe)|*.exe|Command Files (*.cmd)|*.cmd";
                fbd.FilterIndex = 1;
                fbd.RestoreDirectory = true;

                DialogResult res = fbd.ShowDialog();

                if (res == DialogResult.OK && !String.IsNullOrWhiteSpace(fbd.FileName))
                {
                    IISResetDirectoryText.Text = fbd.FileName;
                    DeployButton.Enabled = TemporaryFilesText.Text.Length > 0 && UploaderDirectoryText.Text.Length > 0 && IISResetDirectoryText.Text.Length > 0 && BuildDirectoryText.Text.Length > 0;
                    KillButton.Enabled = TemporaryFilesText.Text.Length > 0 && UploaderDirectoryText.Text.Length > 0 && IISResetDirectoryText.Text.Length > 0 && BuildDirectoryText.Text.Length > 0;
                }
            }
        }

        private void UploaderDirectory_Click(object sender, EventArgs e)
        {
            using (var fbd = new OpenFileDialog())
            {
                fbd.Filter = "Executable Files (*.exe)|*.exe|Command Files (*.cmd)|*.cmd";
                fbd.FilterIndex = 1;
                fbd.RestoreDirectory = true;

                DialogResult res = fbd.ShowDialog();

                if (res == DialogResult.OK && !String.IsNullOrWhiteSpace(fbd.FileName))
                {
                    UploaderDirectoryText.Text = fbd.FileName;
                    DeployButton.Enabled = TemporaryFilesText.Text.Length > 0 && UploaderDirectoryText.Text.Length > 0 && IISResetDirectoryText.Text.Length > 0 && BuildDirectoryText.Text.Length > 0;
                    KillButton.Enabled = TemporaryFilesText.Text.Length > 0 && UploaderDirectoryText.Text.Length > 0 && IISResetDirectoryText.Text.Length > 0 && BuildDirectoryText.Text.Length > 0;
                }
            }
        }

        private void TemporaryFiles_Click(object sender, EventArgs e)
        {
            using (var fbd = new FolderBrowserDialog())
            {
                DialogResult res = fbd.ShowDialog();

                if (res == DialogResult.OK && !String.IsNullOrWhiteSpace(fbd.SelectedPath))
                {
                    System.Security.Cryptography.MD5 mD = System.Security.Cryptography.MD5.Create();
                    mD.ComputeHash(Encoding.ASCII.GetBytes("RANDOMHASHCOCK"));
                    TemporaryFilesText.Text = fbd.SelectedPath;
                    DeployButton.Enabled = TemporaryFilesText.Text.Length > 0 && UploaderDirectoryText.Text.Length > 0 && IISResetDirectoryText.Text.Length > 0 && BuildDirectoryText.Text.Length > 0;
                    KillButton.Enabled = TemporaryFilesText.Text.Length > 0 && UploaderDirectoryText.Text.Length > 0 && IISResetDirectoryText.Text.Length > 0 && BuildDirectoryText.Text.Length > 0;
                    PCMD5HashCurrent.Text = (TemporaryFilesText.Text.Length > 0 && UploaderDirectoryText.Text.Length > 0 && IISResetDirectoryText.Text.Length > 0 && BuildDirectoryText.Text.Length > 0) ? Encoding.Default.GetString(mD.Hash) : "";
                    ;
                }
            }
        }
    }
}
