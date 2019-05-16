from __future__ import unicode_literals
from frappe import _

# def get_data():
#         return
#         [
#             {
#                 "label": ("Master"),
#                 "items": [
#                     {
#                         "type": "docytpe",
#                         "name": "Master Buku"
#                     },
#                     {
#                         "type": "docytpe",
#                         "name": "Master Member"
#                     },
#                     {
#                         "type": "docytpe",
#                         "name": "Master Tipe Buku"
#                     }
#                 ]
#             },
#             {
#                 "label": ("Transaction"),
#                 "items": [
#                     {
#                         "type": "docytpe",
#                         "name": "Pinjaman"
#                     },
#                     {
#                         "type": "docytpe",
#                         "name": "Pengembalian"
#                     }
#                 ]
#             }
#         ]


def get_data():
	return [
		{
			"label": _("Master"),
			"items": [
				{
					"type": "doctype",
					"name": "Master Buku"
				},
				{
					"type": "doctype",
					"name": "Master Member"
				},
                {
					"type": "doctype",
					"name": "Master Tipe Buku"
				}
			]
		},
        {
			"label": _("Transaction"),
			"items": [
				{
					"type": "doctype",
					"name": "Pinjaman"
				},
				{
					"type": "doctype",
					"name": "Pengembalian"
				},
				{
					"type": "doctype",
					"name": "Requst Pinjaman"
				}
			]
		}
    ]