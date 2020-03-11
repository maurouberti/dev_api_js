import Bill from './../schema/Bill'

export default (req, res) => {
	Bill
		.create(req.body)
		.then(created =>  {
			if (!created) {
				return res.status(404).json({ status: false, data: {} })
			}
			res.status(201).json({ status: true, data: created })
		})
		.catch(err => {
			console.log(err)
			return res.status(500).json({ status: false, data: {} })
		})
}
