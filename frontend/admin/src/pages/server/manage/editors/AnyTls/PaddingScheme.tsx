import React from 'react';
import JsonEditor from '@/pages/server/manage/editors/JsonEditor';

export const DEFAULT_PADDING_SCHEME = JSON.stringify(
    [
        'stop=8',
        '0=30-30',
        '1=100-400',
        '2=400-500,c,500-1000,c,500-1000,c,500-1000,c,500-1000',
        '3=9-9,500-1000',
        '4=500-1000',
        '5=500-1000',
        '6=500-1000',
        '7=500-1000',
    ],
    null,
    4,
);

export interface AnyTlsPaddingSchemeProps {
    value?: string | null;
    onChange: (value: string) => void;
}

export function AnyTlsPaddingScheme({
    value,
    onChange,
}: AnyTlsPaddingSchemeProps): React.ReactElement {
    return (
        <div id="anytls-padding-scheme">
            <div className="form-group">
                <JsonEditor
                    placeholder={DEFAULT_PADDING_SCHEME}
                    mode="json"
                    theme="github"
                    fontSize={14}
                    showPrintMargin
                    showGutter
                    highlightActiveLine
                    value={value || ''}
                    onChange={onChange}
                    setOptions={{
                        enableBasicAutocompletion: false,
                        enableLiveAutocompletion: false,
                        enableSnippets: false,
                        showLineNumbers: true,
                        tabSize: 2,
                    }}
                />
            </div>
        </div>
    );
}
