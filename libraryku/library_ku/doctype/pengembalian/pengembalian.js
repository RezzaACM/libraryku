// Copyright (c) 2019, RezzaACM and contributors
// For license information, please see license.txt

frappe.ui.form.on('Pengembalian', {
	refresh: function(frm) {

	},
	id_pinjaman: function (frm){
		frm.doc.pengembalian_line = []
		if (frm.doc.id_pinjaman){
			frappe.call({
				method: "frappe.client.get",
				args: {
					doctype: "Pinjaman",
					name: frm.doc.id_pinjaman
				},
				callback: function (r){
					if (r.message){
						for (var row in r.message.pinjaman_line){
							var child = frm.add_child("pengembalian_line");
							frappe.model.set_value(child.doctype, child.name, "code_buku",
								r.message.pinjaman_line[row].code_buku);
							frappe.model.set_value(child.doctype, child.name, "nama_buku",
								r.message.pinjaman_line[row].nama_buku);
							frappe.model.set_value(child.doctype, child.name, "tipe_buku",
								r.message.pinjaman_line[row].tipe_buku);							
						}
					}
					console.log(r);
					frm.refresh_field('pengembalian_line')
				}
			})
		}
	}
});
cur_frm.set_query('id_pinjaman',function(){
	return{
		filters: [
			['Pinjaman','status','=','On Borrow']
		]
	}
})