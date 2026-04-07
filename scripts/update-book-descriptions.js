/* eslint-env node */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fonction pour attendre un délai (éviter les limites de taux de l'API)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Fonction pour rechercher un livre dans l'API Google Books
async function searchBookDescription(title, author) {
  try {
    // Nettoyer le titre et l'auteur pour la requête
    const cleanTitle = encodeURIComponent(title.trim());
    const cleanAuthor = encodeURIComponent(author.trim());
    
    // Construire la requête avec intitle et inauthor
    const query = `intitle:${cleanTitle}+inauthor:${cleanAuthor}`;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=1`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Vérifier si des résultats ont été trouvés
    if (data.items && data.items.length > 0) {
      const book = data.items[0];
      const description = book.volumeInfo?.description;
      
      if (description && description.trim().length > 0) {
        return description.trim();
      }
    }
    
    return null;
  } catch (error) {
    console.error(`Erreur lors de la recherche pour "${title}" par ${author}:`, error.message);
    return null;
  }
}

// Fonction principale
async function updateBookDescriptions() {
  const booksFilePath = path.join(__dirname, '../src/data/books.js');
  
  try {
    // Lire le fichier books.js
    const fileContent = fs.readFileSync(booksFilePath, 'utf-8');
    
    // Extraire le contenu JSON (enlever "export const books = " et le ";" final optionnel)
    // La regex capture tout entre [ et ] même s'il n'y a pas de point-virgule à la fin
    let jsonMatch = fileContent.match(/export\s+const\s+books\s*=\s*(\[[\s\S]*\])\s*;?\s*$/m);
    
    if (!jsonMatch) {
      // Essayer une approche alternative : chercher juste le tableau JSON qui commence après "export const books ="
      jsonMatch = fileContent.match(/export\s+const\s+books\s*=\s*(\[[\s\S]*\])/);
      if (!jsonMatch) {
        throw new Error('Impossible de parser le fichier books.js. Format non reconnu.');
      }
    }
    
    const jsonString = jsonMatch[1];
    const books = JSON.parse(jsonString);
    
    // Filtrer uniquement les livres sans description
    const booksWithoutDescription = books.filter(book => 
      !book.description || book.description.trim().length === 0
    );
    
    console.log(`\n📚 Total de livres: ${books.length}`);
    console.log(`📝 Livres sans description: ${booksWithoutDescription.length}\n`);
    
    if (booksWithoutDescription.length === 0) {
      console.log('✅ Tous les livres ont déjà une description !\n');
      return;
    }
    
    let updatedCount = 0;
    let failedCount = 0;
    let skippedCount = 0;
    
    // Traiter uniquement les livres sans description
    for (let i = 0; i < booksWithoutDescription.length; i++) {
      const book = booksWithoutDescription[i];
      const { title, author } = book;
      
      console.log(`[${i + 1}/${booksWithoutDescription.length}] Recherche: "${title}" par ${author}...`);
      
      try {
        const description = await searchBookDescription(title, author);
        
        if (description) {
          book.description = description;
          updatedCount++;
          console.log(`  ✅ Description mise à jour (${description.length} caractères)`);
        } else {
          skippedCount++;
          console.log(`  ⚠️  Aucune description trouvée dans l'API`);
        }
        
        // Délai entre les requêtes pour éviter les limites de taux (150ms)
        if (i < booksWithoutDescription.length - 1) {
          await delay(150);
        }
      } catch (error) {
        failedCount++;
        console.error(`  ❌ Erreur: ${error.message}`);
      }
    }
    
    // Réécrire le fichier avec les nouvelles descriptions
    const updatedContent = `export const books = ${JSON.stringify(books, null, 2)};`;
    fs.writeFileSync(booksFilePath, updatedContent, 'utf-8');
    
    // Résumé
    console.log(`\n${'='.repeat(50)}`);
    console.log(`📊 Résumé:`);
    console.log(`   📖 Total de livres: ${books.length}`);
    console.log(`   📝 Livres sans description traités: ${booksWithoutDescription.length}`);
    console.log(`   ✅ Descriptions mises à jour: ${updatedCount}`);
    console.log(`   ⚠️  Livres non trouvés dans l'API: ${skippedCount}`);
    console.log(`   ❌ Erreurs: ${failedCount}`);
    console.log(`${'='.repeat(50)}\n`);
    
  } catch (error) {
    console.error('❌ Erreur fatale:', error.message);
    process.exit(1);
  }
}

// Exécuter le script
updateBookDescriptions();
