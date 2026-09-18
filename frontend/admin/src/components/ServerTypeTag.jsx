import React from 'react';
import { a as Tag } from '../vendor/modules/antdTag.js';

export function renderServerTypeTag(type, label) {
  // Strict switch retains unknown/non-string type behavior; no fallback tag.
  switch (type) {
    case 'shadowsocks': return <Tag color="#489851">{label}</Tag>;
    case 'vmess': return <Tag color="#CB3180">{label}</Tag>;
    case 'trojan': return <Tag color="#EAB854">{label}</Tag>;
    case 'hysteria': return <Tag color="#1A1A1A">{label}</Tag>;
    case 'tuic': return <Tag color="#9400D3">{label}</Tag>;
    case 'vless': return <Tag color="#4080FF">{label}</Tag>;
    case 'anytls': return <Tag color="#FF8C00">{label}</Tag>;
    case 'v2node': return <Tag color="#FF0000">{label}</Tag>;
  }
}
