const path = require("path");

// sinceramente nosé si importar esto otra vez no es un error
// pero lo necisto por o de pgp.as.format de abajo...
// en teoría a lo mejor con un import me funcionaría, pero eso me da el
// error ese de los modules, etc.
// const pgp = require("pg-promise")();

// atención creo q lo de arriba lo debería sustituir por algo así
const { pgp } = require("./dbconnect");
// pero obviamente lo tengo q exportar en el otro

// esto son los llamados Custom Type Formatting
// https://github.com/vitaly-t/pg-promise#custom-type-formatting
class FilterSetMinimo {
  constructor(filters) {
    if (!filters || typeof filters !== "object") {
      throw new TypeError("Parameter 'filters' must be an object.");
    }
    this.filters = filters;
    this.rawType = true; // do not escape the result from toPostgres()
  }

  toPostgres(/*self*/) {
    let f = [];

    if ("theme" in this.filters) {
      let temasstring = "theme_id = " + this.filters["theme"];
      f.push(temasstring);
    }

    // si understood es all no ponemos el filtro, solo si es false/true
    if (this.filters["printed"] && this.filters["printed"] == true)
      f.push("printed = TRUE");

    // si understood es all no ponemos el filtro, solo si es false/true
    if (this.filters["manuscrit"] && this.filters["manuscrit"] == true)
      f.push("manuscrit = TRUE");

    // si understood es all no ponemos el filtro, solo si es false/true
    if ("original" in this.filters) {
      const original = this.filters["original"];
      f.push(`original = ${original}`);
    }

    // hay que convertir el array q tenemos  en un string con and
    // pq es lo q pidepgp.as.format
    let ff = f.join(" AND ");
    let wheresql = pgp.as.format(ff, this.filters);

    // console.log(wheresql);
    // devolvemos un array pq realmente tenemos tres varialbes que completar
    // fecha de inico, fecha fin y luego el WHERE enorme
    // return [this.filters.datebegin, this.filters.dateend, wheresql];
    return wheresql;
  }
}

// Helper for linking to external query files:
function readSQL(file) {
  const fullPath = path.join(__dirname, file);
  return new pgp.QueryFile(fullPath, { minify: true });
}

module.exports = { FilterSetMinimo, readSQL };
