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
