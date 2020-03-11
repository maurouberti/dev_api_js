import express from 'express'
import list from './services/list'
import create from './services/create'
import remove from './services/remove'

const router = express.Router()

router.get('/', list)
router.post('/', create)
router.delete('/:id', remove)

export default router