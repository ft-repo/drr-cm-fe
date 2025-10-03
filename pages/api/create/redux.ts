import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // SAVE FILE
    const { name: main_name } = req.body
    let template = fs.readFileSync('template/redux.txt').toString()
    template = template.replace(/{{name}}/g, main_name)
    const savePath = `store/features/${main_name}Slice.ts`
    fs.writeFileSync(savePath, template)

    // UPDATE LIB INDEX
    let lib_index = fs.readFileSync('lib/store.ts').toString()
    lib_index = lib_index.replace(/\/\/ {{import}}/g, `\t${main_name},\n// {{import}}`)
    lib_index = lib_index.replace(/\/\/ {{export}}/g, `\t${main_name}: ${main_name},\n// {{export}}`)
    fs.writeFileSync('lib/store.ts', lib_index)

    // UPDATE INDEX
    let export_index = fs.readFileSync('store/index.ts').toString()
    export_index = export_index.replace(/\/\/ {{export}}/g, `export { default as ${main_name} } from './features/${main_name}Slice'\n// {{export}}`)
    fs.writeFileSync('store/index.ts', export_index)

    // RETURN RESPONSE
    res.status(200).json({
      success: true,
      response: 'Store create successfully!'
    })
  } catch (error) {
    res.status(500).json({ error: error })
  }
}