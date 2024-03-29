# -*- coding: utf-8 -*-
# Copyright (c) 2019, RezzaACM and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class RequestPinjaman(Document):
	pass

	def on_update (self):
		self.on_approve()

	def on_approve(self):
		if (self.docstatus == 1):
			pinjaman = frappe.new_doc('Pinjaman')
			pinjaman.id_member = self.id_member
			pinjaman.tanggal_pinjaman = self.tanggal_pinjaman
			pinjaman.estimasi_tanggal_pengembalian = self.estimasi_tanggal_pengembalian
			for i in self.request_line:
				pinjaman.append('pinjaman_line',{
					'code_buku': i.code_buku,
					'nama_buku': i.nama_buku,
					'tipe_buku': i.tipe_buku
				})
			pinjaman.save()
			pinjaman.submit()
			self.change_status_buku()
	
	def change_status_buku(self):
		if(self.request_line):
			for i in self.request_line:
				buku = frappe.get_doc("Master Buku", i.code_buku)
				buku.status = "Borrowed"
				buku.save()
			# if(self.status == 'On Borrow'):
			# 	for i in self.pinjaman_line:
			# 		buku = frappe.get_doc("Master Buku",i.code_buku)
			# 		buku.status_buku = 'Borrowed'
			# 		buku.save()