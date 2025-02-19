const { validationResult, body, param } = require("express-validator");

const validateAttribut = (fields) => {
    const validations = fields.map((field) => {
        switch (field) {
            case "titre":
                return body('titre')
                    .notEmpty().withMessage({ name: "titre", message: "Le titre est requis" })
                    .isString().withMessage({ name: "titre", message: "Le titre doit être une chaîne de caractères" });
            case "description":
                return body('description')
                    .optional()
                    .isString().withMessage({ name: "description", message: "La description doit être une chaîne de caractères" });
            case "budget":
                return body('budget')
                    .notEmpty().withMessage({ name: "budget", message: "Le budget est requis" })
                    .isFloat({ gt: 0 }).withMessage({ name: "budget", message: "Le budget doit être un nombre positif" });
            case "Date_prevu":
            case "Date_lancement":
            case "Date_fin_prevu":
            case "Date_fin_lanc":
            case "date_creation":
            case "date_validation":
                return body(field)
                    .notEmpty().withMessage({ name: field, message: `${field} est requis` })
                    .isISO8601().withMessage({ name: field, message: `${field} doit être une date valide (ISO 8601)` });
            case "TypeFinancement":
            case "priorite":
            case "libelle":
            case "code":
            case "nom":
            case "lieu":
            case "avancement":
            case "periorite":
                return body(field)
                    .notEmpty().withMessage({ name: field, message: `${field} est requis` })
                    .isString().withMessage({ name: field, message: `${field} doit être une chaîne de caractères` });
            case "pieceJointe":
                return body('pieceJointe')
                    .notEmpty().withMessage({ name: "pieceJointe", message: "La pièce jointe est requise" })
                    .isString().withMessage({ name: "pieceJointe", message: "La pièce jointe doit être une chaîne de caractères" })
                    .matches(/\.(png|jpeg|jpg)$/i).withMessage({ name: "pieceJointe", message: "La pièce jointe doit être une image de type PNG, JPEG ou JPG" });
            default:
                return null;
        }
    }).filter(Boolean);

    return [
        ...validations,
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const formattedErrors = errors.array().map(err => ({
                    name: err.path,
                    message: err.msg.message || err.msg
                }));
                return res.status(400).json({ errors: formattedErrors });
            }
            next();
        }
    ];
};

module.exports = validateAttribut;
