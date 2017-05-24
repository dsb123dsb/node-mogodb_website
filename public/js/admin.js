// 处理删除电影数据的逻辑
$(() => {
	$('.del').click((e) => {
		var target = $(e.target);
		var id = target.data('id');// 获取元点击素
		var tr = $('.item-id-'+id);

		$.ajax({
			type: 'DELETE',
			url: '/admin/list?id='+id // 异步请求类型：删除
		})
		.done((results) => {
			if(results.success ===1) {
				if(tr.length>0){
					tr.remove();
				}
			}
		});
	});
});