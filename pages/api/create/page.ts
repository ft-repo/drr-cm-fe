import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // SAVE FILE
    const { main_name, sub_name, role, has_sub, is_dynamic } = req.body
    // CREATE HIERACHY
    const root = process.cwd()
    const dir = path.join(root, 'pages', role, main_name, sub_name)
    fs.mkdirSync(dir, { recursive: has_sub ? true : false })
    // FOLDER PATH
    const folderDir = path.join(main_name, sub_name).split(path.sep).join('/')
    // READ AND WRITE FILE
    let template = fs.readFileSync('template/page.txt').toString()
    template = template.replace(/{{component_name}}/g, main_name.charAt(0).toUpperCase() + main_name.slice(1))
    template = template.replace(/{{folder_role}}/g, role.toLowerCase())
    template = template.replace(/{{folder_name}}/g, folderDir.toLowerCase())
    template = template.replace(/{{auth_role}}/g, role)
    const fileName = is_dynamic ? '[id].tsx' : 'index.tsx'
    fs.writeFileSync(`${dir}/${fileName}`, template)
    // RETURN RESPONSE
    res.status(200).json({
      success: true,
      response: 'Page create successfully!'
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error })
  }
}