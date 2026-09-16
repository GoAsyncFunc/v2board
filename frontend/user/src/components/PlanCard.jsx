import React from 'react';
import history from '../vendor/routerHistory.js';
import { a as settings } from '../vendor/localeSettings.js';
import { c as parsePlanContent } from '../vendor/siteHelpers.js';
import { formatMessage } from '../vendor/i18n.js';
import { formatPrice } from './MoneyDisplay.jsx';
const message = id => formatMessage({ id });

export function getUnitPriceTag(plan) {
  let result = {};
  for (const period of Object.keys(settings.periodText).reverse()) {
    if (period !== 'reset_price' && plan[period] !== null) {
      result = { tag: settings.periodText[period] && settings.periodText[period](), price: plan[period] };
    }
  }
  return result;
}

export function matchesPlanTab(plan, tab) {
  if (!tab) return true;
  if (tab === 1) return !!(plan.month_price || plan.quarter_price || plan.half_year_price || plan.year_price || plan.two_year_price || plan.three_year_price);
  if (tab === 2) return !!plan.onetime_price;
  return false;
}

export default function PlanCard({ plan, currencySymbol }) {
  const price = getUnitPriceTag(plan);
  const content = parsePlanContent(plan.content);
  const soldOut = plan.capacity_limit !== null && plan.capacity_limit <= 0;
  const nearlySoldOut = plan.capacity_limit !== null && plan.capacity_limit <= 5 && plan.capacity_limit >= 1;
  return (
    <div className="col-md-12 col-xl-4">
      <a className="block block-link-pop block-rounded m-3 mx-xl-0" href="javascript:void(0);" onClick={() => { if (!soldOut) history.push(`/plan/${plan.id}`); }}>
        <div className="block-header plan">
          <h3 className="block-title">{plan.name}</h3>
          {nearlySoldOut && <span className="v2board-sold-out-tag">{message('即将售罄')}</span>}
        </div>
        <div className="block-content bg-gray-light"><div className="py-2">
          <p className="h1 mb-2">{currencySymbol}{' '}{formatPrice(price.price)}</p>
          <p className="h6 text-muted">{price.tag}</p>
        </div></div>
        <div className="block-content py-3">
          <React.Fragment>{plan.content ? typeof content === 'object' ? (
            <div className="mb-3">{content.map(feature => (
              <div style={{ textAlign: 'left', marginBottom: 8, opacity: feature.support ? 1 : 0.3 }}>
                <i className={feature.support ? 'si si-check text-primary' : 'si si-close text-primary'} style={{ fontSize: 21, verticalAlign: 'sub' }} />
                <span style={{ paddingLeft: 8 }}>{feature.feature}</span>
              </div>
            ))}</div>
          ) : <div className="mb-3" dangerouslySetInnerHTML={{ __html: plan.content }} /> : ''}</React.Fragment>
          <button type="button" disabled={soldOut} className="btn btn-sm btn-alt-primary">{message(soldOut ? '已售罄' : '立即订阅')}</button>
        </div>
      </a>
    </div>
  );
}
