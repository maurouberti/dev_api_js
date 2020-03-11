import Category from './../schema/Category'

export default (req, res) => {
	Category
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
