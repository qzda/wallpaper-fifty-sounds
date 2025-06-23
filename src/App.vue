<script setup lang="ts">
  import { ref } from 'vue'
  // import MaterialSymbolsVolumeOff from './components/Icons/MaterialSymbolsVolumeOff.vue'
  // import MaterialSymbolsVolumeUp from './components/Icons/MaterialSymbolsVolumeUp.vue'
  import Card from './components/Card.vue'
  import type { DisplayMode, Timestamp } from './type'
  import { 清音, 濁音, 拗音 } from './data'

  // const isDev = import.meta.env.DEV

  const displayMode = ref<DisplayMode>('both')

  const Timestamp: Record<string, Timestamp> = {
    あ: { start: 0, end: 0.8 },
    い: { start: 1, end: 2 },
    う: { start: 2, end: 3 },
    え: { start: 3, end: 4 },
    お: { start: 4, end: 5 },

    か: { start: 5.5, end: 6.5 },
    き: { start: 6.5, end: 7.5 },
    く: { start: 7.5, end: 8.5 },
    け: { start: 8.5, end: 9.5 },
    こ: { start: 9.5, end: 10.5 },

    さ: { start: 11, end: 12 },
    し: { start: 12, end: 13 },
    す: { start: 13.2, end: 14 },
    せ: { start: 14, end: 15 },
    そ: { start: 15, end: 16 },

    た: { start: 16, end: 17 },
    ち: { start: 17, end: 18 },
    つ: { start: 18, end: 19 },
    て: { start: 19, end: 20 },
    と: { start: 20, end: 21 },

    // todo 调试到这里了
    な: { start: 21.5, end: 23 },
    に: { start: 23.2, end: 24.2 },
    ぬ: { start: 24.2, end: 25.2 },
    ね: { start: 25.5, end: 26.5 },
    の: { start: 26.5, end: 27.5 },

    は: { start: 25, end: 26 },
    ひ: { start: 26, end: 27 },
    ふ: { start: 27, end: 28 },
    へ: { start: 28, end: 29 },
    ほ: { start: 29, end: 30 },

    ま: { start: 30, end: 31 },
    み: { start: 31, end: 32 },
    む: { start: 32, end: 33 },
    め: { start: 33, end: 34 },
    も: { start: 34, end: 35 },

    や: { start: 35, end: 36 },
    ゆ: { start: 36, end: 37 },
    よ: { start: 37, end: 38 },

    ら: { start: 38, end: 39 },
    り: { start: 39, end: 40 },
    る: { start: 40, end: 41 },
    れ: { start: 41, end: 42 },
    ろ: { start: 42, end: 43 },

    わ: { start: 43, end: 44 },
    を: { start: 44, end: 45 },

    ん: { start: 45, end: 46 },
  }

  // const isSpeaking = ref(false)
  // function speak(cell: Cell) {
  //   if (!audioRef.value || voiceDisabled.value || isSpeaking.value) return

  //   const timestamp = Timestamp[cell.hiragana]
  //   if (!timestamp) {
  //     console.warn('No timestamp found for:', cell)
  //     return
  //   }

  //   const audio = audioRef.value
  //   audio.pause()
  //   audio.currentTime = 0
  //   audio.currentTime = timestamp.start

  //   // 创建时间更新处理函数
  //   const timeUpdateHandler = () => {
  //     if (audio.currentTime >= timestamp.end) {
  //       audio.pause()
  //       audio.removeEventListener('timeupdate', timeUpdateHandler)
  //       isSpeaking.value = false
  //     }
  //   }

  //   // 添加时间更新监听
  //   audio.addEventListener('timeupdate', timeUpdateHandler)

  //   // 开始播放
  //   isSpeaking.value = true
  //   audio.play().catch((error) => {
  //     audio.pause()
  //     audio.removeEventListener('timeupdate', timeUpdateHandler)
  //     isSpeaking.value = false
  //     console.error('Failed to play audio:', error)
  //   })
  // }

  // const voiceDisabled = ref(false)
  // const audioRef = ref<HTMLAudioElement | null>(null)

  // function toggleVoice() {
  //   voiceDisabled.value = !voiceDisabled.value
  //   if (audioRef.value) {
  //     audioRef.value.muted = voiceDisabled.value

  //     if (voiceDisabled.value) {
  //       audioRef.value.pause()
  //     }
  //   }
  // }
</script>

<template>
  <div class="xy flex-wrap gap-4 ws-nowrap text-4">
    <div class="xy">
      <button class="btn" :class="displayMode === 'both' ? 'text-green' : null"
        @click="displayMode = 'both'">両方表示</button>
      <button class="btn" :class="displayMode === 'hiragana' ? 'text-green' : null"
        @click="displayMode = 'hiragana'">あ</button>
      <button class="btn" :class="displayMode === 'katakana' ? 'text-green' : null"
        @click="displayMode = 'katakana'">ア</button>
    </div>

    <!-- <div class="xy">
      <button class="btn xy-center" @click="toggleVoice">
        <MaterialSymbolsVolumeOff v-if="voiceDisabled" />
        <MaterialSymbolsVolumeUp v-else />
      </button>
    </div> -->
  </div>

  <!-- <audio ref="audioRef" controls preload="auto" v-show="isDev">
    <source src="./assets/fifty-sounds.mp3" type="audio/mp3" />
  </audio> -->

  <div class="w-full xy items-start flex-wrap gap-8">
    <table class="flex-1">
      <thead>
        <tr>
          <th :colspan="清音[0].length + 1">清音</th>
        </tr>
      </thead>
      <tbody>
        <tr class="text-gray-500">
          <td></td>
          <td v-for="i in ['a', 'i', 'u', 'e', 'o']" class="text-center">{{ i }}</td>
        </tr>
        <tr v-for="(row, rowIndex) in 清音" :key="rowIndex" class="">
          <td class="w-4 text-end text-gray-500">
            {{ ['-', 'k', 's', 't', 'n', 'h', 'm', 'y', 'r', 'w', ''][rowIndex] }}
          </td>

          <td v-for="(cell, cellIndex) in row" :key="cellIndex">
            <Card :cell="cell" :displayMode="displayMode" />
          </td>
        </tr>
      </tbody>
    </table>

    <table class="flex-1">
      <thead>
        <tr>
          <th :colspan="濁音[0].length + 1">濁音</th>
        </tr>
      </thead>
      <tbody>
        <tr class="text-gray-500">
          <td></td>
          <td v-for="i in ['a', 'i', 'u', 'e', 'o']" class="text-center">{{ i }}</td>
        </tr>
        <tr v-for="(row, rowIndex) in 濁音" :key="rowIndex" class="">
          <td class="w-4 text-end text-gray-500">
            {{ ['g', 'z', 'd', 'b', 'p',][rowIndex] }}
          </td>

          <td v-for="(cell, cellIndex) in row" :key="cellIndex">
            <Card :cell="cell" :displayMode="displayMode" />
          </td>
        </tr>
      </tbody>
    </table>

    <table class="flex-1">
      <thead>
        <tr>
          <th :colspan="拗音[0].length + 1">拗音</th>
        </tr>
      </thead>
      <tbody>
        <tr class="text-gray-500">
          <td></td>
          <td v-for="i in ['ya', 'yu', 'yo',]" class="text-center">{{ i }}</td>
        </tr>
        <tr v-for="(row, rowIndex) in 拗音" :key="rowIndex" class="">
          <td class="w-4 text-end text-gray-500">
            {{ ['k', 's', 't', 'n', 'h', 'm', 'r', 'g', 'j', 'b', 'p'][rowIndex] }}
          </td>

          <td v-for="(cell, cellIndex) in row" :key="cellIndex">
            <Card :cell="cell" :displayMode="displayMode" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
