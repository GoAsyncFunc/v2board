import React from 'react';
import ConfigRow from './ConfigRow.jsx';

function AppPlatformSetting({ name, description, version, downloadUrl, onChange, downloadPlaceholder }) {
  return (
    <ConfigRow title={name} description={description}>
      <input
        type="text"
        className="form-control"
        placeholder="1.0.0"
        defaultValue={version}
        onChange={event => onChange('version', event.target.value)}
      />
      <input
        type="text"
        className="form-control mt-1"
        placeholder={downloadPlaceholder}
        defaultValue={downloadUrl}
        onChange={event => onChange('downloadUrl', event.target.value)}
      />
    </ConfigRow>
  );
}

export default function AppConfigTab({ app, onChange }) {
  return (
    <>
      <div className="block-content">
        <div className="row">
          <div className="col-lg-12">
            <div className="alert alert-warning" role="alert">
              <p className="mb-0">用于自有客户端(APP)的版本管理及更新</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <AppPlatformSetting
          name="Windows"
          description="Windows端版本号及下载地址"
          version={app.windows_version}
          downloadUrl={app.windows_download_url}
          downloadPlaceholder="https://xxxx.com/xxx.exe"
          onChange={(field, value) => onChange(field === 'version' ? 'windows_version' : 'windows_download_url', value)}
        />
        <AppPlatformSetting
          name="macOS"
          description="macOS端版本号及下载地址"
          version={app.macos_version}
          downloadUrl={app.macos_download_url}
          downloadPlaceholder="https://xxxx.com/xxx.dmg"
          onChange={(field, value) => onChange(field === 'version' ? 'macos_version' : 'macos_download_url', value)}
        />
        <AppPlatformSetting
          name="Android"
          description="Android端版本号及下载地址"
          version={app.android_version}
          downloadUrl={app.android_download_url}
          downloadPlaceholder="https://xxxx.com/xxx.apk"
          onChange={(field, value) => onChange(field === 'version' ? 'android_version' : 'android_download_url', value)}
        />
      </div>
    </>
  );
}
