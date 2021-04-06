# Bare custom AWS Amplify Auth flow styled

Custom AWS Amplify, React JS and TypeScript sign in, sign up, user confirmation, password recovery and PWA install button.

## Clone the repo

Delete the amplify folder and the aws-exports.js file.

If you never have worked with AWS Amplify.

https://docs.amplify.aws/

After AWS Amplify configuration:

`amplify init`

Enter a name for the project bareauthstyled<br />
? Enter a name for the environment dev<br />
? Choose your default editor: Visual Studio Code<br />
? Choose the type of app that you're building javascript<br />
Please tell us about your project<br />
? What javascript framework are you using react<br />
? Source Directory Path: src<br />
? Distribution Directory Path: build<br />
? Build Command: npm run-script build<br />
? Start Command: npm run-script start<br />
...
? Do you want to use an AWS profile? Yes<br />
? Please choose the profile you want to use: default

`amplify add auth`

Do you want to use the default authentication and security configur
ation? Default configuration<br />
Warning: you will not be able to edit these selections.<br />
How do you want users to be able to sign in? Username<br />
Do you want to configure advanced settings? No, I am done.

`amplify push`

Are you sure you want to continue? Yes

`yarn install`

Happy hacking :)
