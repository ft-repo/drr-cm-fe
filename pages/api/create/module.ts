import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // SAVE FILE
    const { main_name, sub_name, role } = req.body
    // CREATE HIERACHY
    const root = process.cwd()
    const dir = path.join(root, 'features', role, main_name, sub_name, 'screen')
    const componentDir = path.join(root, 'features', role, main_name, sub_name, 'components')
    // MAKE DIR
    fs.mkdirSync(dir, { recursive: true })
    fs.mkdirSync(componentDir, { recursive: true })
    // READ AND WRITE INDEX
    let template = fs.readFileSync('template/module.txt').toString()
    template = template.replace(/{{module_name}}/g, main_name.charAt(0).toUpperCase() + main_name.slice(1))
    fs.writeFileSync(`${dir}/index.tsx`, template)
    // WRITE COMPONENTS
    fs.writeFileSync(`${componentDir}/index.ts`, '')
    // RETURN RESPONSE
    res.status(200).json({
      success: true,
      response: 'Module create successfully!'
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error })
  }
}