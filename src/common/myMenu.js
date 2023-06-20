export default {
	order: [{
		name: 'Trong khi chờ thanh toán',
		img: '/static/user/daifukuan.png',
		jumpUrl: '/pages/user/order/order?tab=PendingPayment'
	},
	{
		name: 'Được thu thập',
		img: '/static/user/daishouhuo.png',
		jumpUrl: '/pages/user/order/order?tab=PendingReceipt'
	},
	{
		name: 'Được đánh giá',
		img: '/static/user/daipingjia.png',
		jumpUrl: '/pages/user/order/order?tab=Received'
	},
	{
		name: 'Hoàn lại tiền/sau mua',
		img: '/static/user/shouhou.png',
		jumpUrl: '/pages/user/order/order?tab=Refund'
	}
	],
	myFn: [{
		name: 'phiếu mua hàng',
		img: '/static/user/youhuiquan.png',
		jumpUrl: '/pages/user/coupon/coupon'
	},
	{
		name: 'Lỳ xì của tôi',
		img: '/static/user/hongbao.png',
		jumpUrl: '/pages/user/redPacket/redPacket'
	},
	{
		name: 'Bộ sưu tập của tôi',
		img: '/static/user/shoucang.png',
		jumpUrl: '/pages/user/like/like'
	},
	{
		name: 'Duyệt hồ sơ',
		img: '/static/user/liulanjilu.png',
		jumpUrl: '/pages/user/history/history'
	}
	],
	tools: [{
		name: 'Túi của tôi',
		img: '/static/user/qianbao.png'
	},
	{
		name: 'Dịch vụ khách hàng chính thức',
		img: '/static/user/kefu.png'
	},
	{
		name: 'Phản hồi của khách hàng',
		img: '/static/user/yonghufankui.png'
	},
	{
		name: 'Giấy chứng nhận trình độ chuyên môn',
		img: '/static/user/zizhizhengzhao.png'
	},
	{
		name: 'Quy tắc giao thức',
		img: '/static/user/xieyiguize.png'
	},
	{
		name: 'Cửa hàng ngoại tuyến',
		img: '/static/user/xianxiamendian.png'
	},
	{
		name: 'Cập nhật nhật ký',
		img: '/static/user/update.png',
		url: '/pages/user/update/update'
	}
	]

}
