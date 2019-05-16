/* eslint-disable */
// rename this file from _test_[name] to test_[name] to activate
// and remove above this line

QUnit.test("test: Pinjaman", function (assert) {
	let done = assert.async();

	// number of asserts
	assert.expect(5);

	frappe.run_serially([
		// insert a new Pinjaman
		() => frappe.tests.make('Pinjaman', [
			// values to be set
			{id_member: 'MEMBER-001'},
			{tanggal_pinjaman: get_today()},
			{status: 'On Borrow'},
			{pinjaman_line:[
			[
				{'code_buku':'BUKU-002'}
			],
			[
				{'code_buku': 'BUKU-003'}
			]
			]}

		]),
		() => {
			assert.equal(cur_frm.doc.id_member, 'MEMBER-001');
			assert.equal(cur_frm.doc.tanggal_pinjaman, get_today());
			assert.equal(cur_frm.doc.status, 'On Borrow');
			assert.ok(cur_frm.doc.pinjaman_line[0].code_buku == 'BUKU-002');
			assert.ok(cur_frm.doc.pinjaman_line[1].code_buku == 'BUKU-003');
		},
		() => done()
	]);

});
