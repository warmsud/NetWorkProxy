/**
 * @name Pillow
 * @desc Pillow 会员解锁
 * @author PixMason
 * @version 1.0.0
 * @update 2025-09-11
 * @supported Pillow ≥5.16.1
 * @disclaimer 本脚本仅供学习和研究使用，严禁用于商业或非法用途。作者不对使用本模块产生的任何后果负责。
 */
try {
	const obj = JSON.parse($response.body)

	const set2099 = (o) => {
		if (!o) return
		// entitlements.premium
		const ent = o.entitlements && o.entitlements.premium
		if (ent) {
			ent.purchase_date = '2099-12-31T06:47:46Z'
			ent.expires_date = '2099-12-31T23:59:59Z'
			if ('grace_period_expires_date' in ent) ent.grace_period_expires_date = null
		}
		// subscriptions
		if (o.subscriptions) {
			for (const k of Object.keys(o.subscriptions)) {
				const sub = o.subscriptions[k] || {}
				sub.purchase_date = '2099-12-31T06:47:46Z'
				sub.original_purchase_date = '2099-12-31T06:47:47Z'
				sub.expires_date = '2099-12-31T23:59:59Z'
				sub.period_type = 'trial'
				if ('unsubscribe_detected_at' in sub) sub.unsubscribe_detected_at = null
				if ('grace_period_expires_date' in sub) sub.grace_period_expires_date = null
				o.subscriptions[k] = sub
			}
		}
	}

	// receipts 返回有时直接是 subscriber 对象，有时外层包一层
	if (obj.subscriber) set2099(obj.subscriber)
	else if (obj && obj.entitlements) set2099(obj)

	$done({ body: JSON.stringify(obj) })
} catch (e) {
	// 避免解析失败阻断
	$done({})
}
