const result_linter = process.argv[2];

if (result_linter.toString() === '0') {
    console.log('Linter no ha trobat cap error... ✅');    
} else {
    console.log('Linter ha trobat errors... ❌');    
}