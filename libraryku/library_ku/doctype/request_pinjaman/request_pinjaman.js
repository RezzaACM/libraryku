// Copyright (c) 2019, RezzaACM and contributors
// For license information, please see license.txt

frappe.ui.form.on('Request Pinjaman', {
	refresh: function(frm) {

	},
	tanggal_pinjaman : function(frm){
		if (frm.doc.tanggal_pinjaman < get_today()){
			frm.set_value('tanggal_pinjaman','');
			frappe.throw(__('Tidak dapat memilih tanggal sebelumnya'));
		
		}
		frappe.call({
			method: "frappe.client.get",
			args: {
				doctype: "Master Member",
				name: frm.doc.id_member
			},
			callback: function (r){
				if(r.message.tipe_member == 'Bronze'){
					frm.set_value('estimasi_tanggal_pengembalian',
						frappe.datetime.add_days(frm.doc.tanggal_pinjaman,3));
				}else if(r.message.tipe_member == 'Silver'){
					frm.set_value('estimasi_tanggal_pengembalian',
						frappe.datetime.add_days(frm.doc.tanggal_pinjaman,5));
				}else{
					frm.set_value('estimasi_tanggal_pengembalian',
						frappe.datetime.add_days(frm.doc.tanggal_pinjaman,7));
				}
				// elseif(r.message.tipe_member == 'Silver'){
				// 	frm.set_value('estimasi_tanggal_pengembalian',
				// 		frappe.datetime.add_days(frm.doc.tanggal_pinjaman,5));
				// }else{
				// 	frm.set_value('estimasi_tanggal_pengembalian',
				// 		frappe.datetime.add_days(frm.doc.tanggal_pinjaman,7));
				// }
			}	
		})
	},
});

cur_frm.set_query('code_buku','request_line',function(doc, cdt, cdn){
	var d = locals[cdt][cdn];
	return{
		filters: [
			['Master Buku','status_buku','=','Available']
		]
	}
});

