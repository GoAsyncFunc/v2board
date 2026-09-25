import React from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/json';
import 'brace/theme/github';

export default function JsonEditor(
    props: React.ComponentProps<typeof AceEditor>,
): React.ReactElement {
    return <AceEditor {...props} />;
}
