import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";


// Corrigir __dirname em ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function generate_image_report(json){
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    const params = `?alimento=${encodeURIComponent(json.alimento)}
                    &quantidade=${encodeURIComponent(json.quantidade)}
                    &calorias_kcal=${encodeURIComponent(json.calorias_kcal)}
                    &carboidratos_g=${encodeURIComponent(json.carboidratos_g)}
                    &proteinas_g=${encodeURIComponent(json.proteinas_g)}
                    &gorduras_totais_g=${encodeURIComponent(json.gorduras_totais_g)}
                    `

    const htmlPath = `file://${path.join(__dirname, `grafico.html${params}`)}`;
    //   const url = `file://${path.join(__dirname, 'template.html')}`;

    await page.goto(htmlPath, { waitUntil: 'networkidle0' });

    await new Promise(resolve => setTimeout(resolve, 4000)); // 1 segundo

    const image = await page.screenshot({ fullPage: true });

    const path_file = resolve(__dirname, 'relatorio.png')

    fs.writeFileSync(path_file, image);
    await browser.close();

    return path_file;
}
