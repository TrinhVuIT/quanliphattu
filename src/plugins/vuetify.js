// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Vuetify
import { createVuetify } from "vuetify";

import * as components from "vuetify/components";
import * as labsComponents from "vuetify/labs/components";

export default createVuetify({
  components: {
    ...components,
    ...labsComponents,
  },
});
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides