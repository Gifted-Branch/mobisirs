frappe.ui.form.on('Journey Log', {
    currency: function(frm) {
        if (frm.doc.currency && frm.doc.default_company_currency) {
            
            if (frm.doc.currency === frm.doc.default_company_currency) {
                frm.set_value('exchange_rate', 1.0);
                return;
            }

            frappe.call({
                method: "erpnext.setup.utils.get_exchange_rate",
                args: {
                    from_currency: frm.doc.currency,
                    to_currency: frm.doc.default_company_currency,
                    transaction_date: frm.doc.date || frappe.datetime.get_today()
                },
                callback: function(r) {
                    if (r.message) {
                        frm.set_value('exchange_rate', r.message);
                    }
                }
            });
        }
    }
});