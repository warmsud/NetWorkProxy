/**
 * @name Foodie
 * @desc Foodie 会员解锁
 * @author PixMason
 * @version 1.0.0
 * @update 2025-09-11
 * @supported Foodie ≥5.16.1
 * @disclaimer 本脚本仅供学习和研究使用，严禁用于商业或非法用途。作者不对使用本模块产生的任何后果负责。
 */
try {
	let obj = JSON.parse($response.body || '{}')
	const root = obj.result && typeof obj.result === 'object' ? obj.result : obj

	root.vipSegments = ['SUBSCRIPTION_FREE_ACTIVE']
	root.isTrialPeriod = true
	root.status = 'ACTIVE'
	root.expireDate = 4133865600000
	root.activated = true

	$done({ body: JSON.stringify(obj) })
} catch (e) {
	$done({})
}
