const program = require("commander");
const { prompt } = require("enquirer");
const {
    findGenreByName,
    createGenres,
    deleteGenre,
    updateGenre,
    displayGenres,
} = require("../CLI_Files/genres");

const question = {
    type: "input",
    name: "genreName",
    message: "Genre Name :",
}

program.description("CLIENT COMMAND LINE MANAGEMENT SYSTEM").version("1.0.0");

// Adding a genre
program
    .command("add")
    .alias("a")
    .description("Add a genre")
    .action(() => {
        prompt(questions).then((answers) => {
            createGenres(answers.genreName);
        });
    });

// List All genres in Database
program
    .command("list ")
    .alias("i")
    .description("List all genres")
    .action(() => {
        displayGenres();
    });

// Update A genre
program
    .command("update <_id>")
    .alias("u")
    .description("Update a genre")
    .action((_id) => {
        console.log(_id);
        prompt(questions).then((answers) => {

            updateGenre(_id, answers.genreName);
        }).catch(err => { console.log(err) });
    });

// Remove A genre
program
    .command("remove <_id>")
    .alias("r")
    .description("Remove a genre")
    .action((_id) => {
        deleteGenre(_id);
    });


// Find A genre
program
    .command("find <genreName>")
    .alias("f")
    .description("Find a genre by Name")
    .action((genreName) => {
        findGenreByName(genreName);
    });


program.parse(process.argvs);
