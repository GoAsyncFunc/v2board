import React from 'react';
import Switch from 'antd/lib/switch';
import ConfigRow from './ConfigRow';
import type { ConfigChangeHandler, FrontendConfig } from '../../types/config';

interface FrontendConfigTabProps {
    frontend: FrontendConfig;
    onChange: ConfigChangeHandler<FrontendConfig>;
}

export default function FrontendConfigTab({ frontend, onChange }: FrontendConfigTabProps) {
    return (
        <>
            <div className="block-content">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="alert alert-warning" role="alert">
                            <p className="mb-0">
                                如果你采用前后分离的方式部署V2board管理端，那么本页配置将不会生效。了解
                                <a href="https://docs.v2board.com/use/advanced.html#%E5%89%8D%E7%AB%AF%E5%88%86%E7%A6%BB">
                                    前后分离
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <ConfigRow title="边栏风格">
                    <Switch
                        checkedChildren="亮"
                        unCheckedChildren="暗"
                        checked={frontend.frontend_theme_sidebar === 'light'}
                        onChange={(enabled) =>
                            onChange('frontend_theme_sidebar', enabled ? 'light' : 'dark')
                        }
                    />
                </ConfigRow>
                <ConfigRow title="头部风格">
                    <Switch
                        checkedChildren="亮"
                        unCheckedChildren="暗"
                        checked={frontend.frontend_theme_header === 'light'}
                        onChange={(enabled) =>
                            onChange('frontend_theme_header', enabled ? 'light' : 'dark')
                        }
                    />
                </ConfigRow>
                <ConfigRow title="主题色">
                    <select
                        className="form-control"
                        defaultValue={frontend.frontend_theme_color}
                        onChange={(event) => onChange('frontend_theme_color', event.target.value)}
                    >
                        <option value="default">默认</option>
                        <option value="black">黑色</option>
                        <option value="darkblue">暗蓝色</option>
                        <option value="green">奶绿色</option>
                    </select>
                </ConfigRow>
                <ConfigRow title="背景" description="将会在后台登录页面进行展示。">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="https://xxxxx.com/wallpaper.png"
                        defaultValue={frontend.frontend_background_url}
                        onChange={(event) =>
                            onChange('frontend_background_url', event.target.value)
                        }
                    />
                </ConfigRow>
            </div>
        </>
    );
}
