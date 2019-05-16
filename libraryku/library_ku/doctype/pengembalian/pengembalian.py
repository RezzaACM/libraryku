# -*- coding: utf-8 -*-
# Copyright (c) 2019, RezzaACM and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class Pengembalian(Document):
	pass

	def validate(self):
		self.change_status_buku()

	def change_status_buku(self):
		if(self.id_pinjaman):
			for i in self.pengembalian_line:
				buku = frappe.get_doc("Master Buku",i.code_buku)
				buku.status_buku = 'Available'
				buku.save()

			pinjaman = frappe.get_doc("Pinjaman", self.id_pinjaman)
			pinjaman.status = "Closed"
			pinjaman.save()
			pinjaman.submit()