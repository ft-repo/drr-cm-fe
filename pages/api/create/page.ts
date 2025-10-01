import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // SAVE FILE
    const { main_name, sub_name, role, is_dynamic } = req.body
    // CREATE HIERACHY
    const root = process.cwd()
    const dir = path.join(root, 'pages', role, main_name, sub_name)
    fs.mkdirSync(dir, { recursive: true })
    // FOLDER PATH
    const folderDir = path.join(main_name, sub_name).split(path.sep).join('/')
    const menuDir = path.join(role, main_name, sub_name).split(path.sep).join('/')
    // READ AND WRITE FILE
    let template = fs.readFileSync('template/page.txt').toString()
    template = template.replace(/{{component_name}}/g, main_name.charAt(0).toUpperCase() + main_name.slice(1))
    template = template.replace(/{{folder_role}}/g, role.toLowerCase())
    template = template.replace(/{{folder_name}}/g, folderDir.toLowerCase())
    template = template.replace(/{{auth_role}}/g, role)
    const fileName = is_dynamic ? '[id].tsx' : 'index.tsx'
    fs.writeFileSync(`${dir}/${fileName}`, template)
    // READ AND WRITE MENU_TEMPLATE
    let menu_template = fs.readFileSync('template/menu.txt').toString()
    menu_template = menu_template.replace(/{{menu_name}}/g, main_name)
    menu_template = menu_template.replace(/{{file_dir}}/g, menuDir.toLowerCase())
    // READ AND WRITE MENU
    let menu = fs.readFileSync(`menu/${role.toLowerCase()}.ts`).toString()
    menu = menu.replace(/\/\/ {{menu_template}}/g, `${menu_template}\n  // {{menu_template}}`)
    console.log(`menu/${role.toLowerCase()}.ts`)
    fs.writeFileSync(`menu/${role.toLowerCase()}.ts`, menu)
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