import { defineConfig, presetWind4, presetIcons } from 'unocss'

export default defineConfig({
  shortcuts: {
    xy: "flex gap-2",
    yx: "flex flex-col gap-2",
    "xy-center": "xy justify-center items-center",
    "yx-center": "yx justify-center items-center",
    "xy-between": "xy justify-between",
    "yx-between": "yx justify-between",
    'box': 'border rounded-md p-4 flex-1 relative',
    'btn': 'border rounded-md px-3 py-2 cursor-pointer '
  },
  presets: [
    presetWind4(),
    presetIcons({
      extraProperties: {
        display: "inline-block",
        height: "1.2em",
        width: "1.2em",
        "vertical-align": "text-bottom",
      },
    }),
  ],
})