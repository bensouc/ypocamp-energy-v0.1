# Pin npm packages by running ./bin/importmap

pin "application", preload: true
pin "@hotwired/turbo-rails", to: "turbo.min.js", preload: true
pin "@hotwired/stimulus", to: "https://ga.jspm.io/npm:@hotwired/stimulus@3.2.1/dist/stimulus.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js", preload: true
pin_all_from "app/javascript/controllers", under: "controllers"
pin "block_enter"
pin "popper", to: "popper.js", preload: true
pin "bootstrap", to: "bootstrap.min.js", preload: true
pin "sweetalert2", to: "https://ga.jspm.io/npm:sweetalert2@11.6.14/dist/sweetalert2.all.js"
pin "stimulus-content-loader", to: "https://ga.jspm.io/npm:stimulus-content-loader@4.0.1/dist/stimulus-content-loader.es.js"
pin "@hubspot/api-client", to: "https://ga.jspm.io/npm:@hubspot/api-client@8.2.0/lib/index.js"
pin "crypto", to: "https://ga.jspm.io/npm:@jspm/core@2.0.0-beta.27/nodelibs/browser/crypto.js"
pin "lodash.get", to: "https://ga.jspm.io/npm:lodash.get@4.4.2/index.js"
pin "lodash.merge", to: "https://ga.jspm.io/npm:lodash.merge@4.6.2/index.js"
pin "node-fetch", to: "https://ga.jspm.io/npm:node-fetch@2.6.7/browser.js"
pin "dotenv", to: "https://ga.jspm.io/npm:dotenv@16.0.3/lib/main.js"
pin "fs", to: "https://ga.jspm.io/npm:@jspm/core@2.0.0-beta.27/nodelibs/browser/fs.js"
pin "os", to: "https://ga.jspm.io/npm:@jspm/core@2.0.0-beta.27/nodelibs/browser/os.js"
pin "path", to: "https://ga.jspm.io/npm:@jspm/core@2.0.0-beta.27/nodelibs/browser/path.js"
pin "process", to: "https://ga.jspm.io/npm:@jspm/core@2.0.0-beta.27/nodelibs/browser/process-production.js"
