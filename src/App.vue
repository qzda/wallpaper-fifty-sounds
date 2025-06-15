<script setup lang="ts">
  import { ref } from 'vue'
  import MaterialSymbolsVolumeOff from './components/MaterialSymbolsVolumeOff.vue'
  import MaterialSymbolsVolumeUp from './components/MaterialSymbolsVolumeUp.vue'

  const isDev = import.meta.env.DEV

  /** 显示模式：
   *  @key both 同时显示
   *  @key hiragana 平假名
   *  @key katakana 片假名
   */
  const displayMode = ref<'both' | 'hiragana' | 'katakana'>('both')

  /** 平假名 */
  const hiragana = [
    ['あ', 'い', 'う', 'え', 'お'],
    ['か', 'き', 'く', 'け', 'こ'],
    ['さ', 'し', 'す', 'せ', 'そ'],
    ['た', 'ち', 'つ', 'て', 'と'],
    ['な', 'に', 'ぬ', 'ね', 'の'],
    ['は', 'ひ', 'ふ', 'へ', 'ほ'],
    ['ま', 'み', 'む', 'め', 'も'],
    ['や', '', 'ゆ', '', 'よ'],
    ['ら', 'り', 'る', 'れ', 'ろ'],
    ['わ', '', '', '', 'を'],
    ['ん', '', '', '', ''],
  ]

  /** 片假名 */
  const katakana = [
    ['ア', 'イ', 'ウ', 'エ', 'オ'],
    ['カ', 'キ', 'ク', 'ケ', 'コ'],
    ['サ', 'シ', 'ス', 'セ', 'ソ'],
    ['タ', 'チ', 'ツ', 'テ', 'ト'],
    ['ナ', 'ニ', 'ヌ', 'ネ', 'ノ'],
    ['ハ', 'ヒ', 'フ', 'ヘ', 'ホ'],
    ['マ', 'ミ', 'ム', 'メ', 'モ'],
    ['ヤ', '', 'ユ', '', 'ヨ'],
    ['ラ', 'リ', 'ル', 'レ', 'ロ'],
    ['ワ', '', '', '', 'ヲ'],
    ['ン', '', '', '', ''],
  ] as const

  type Timestamp = {
    start: number
    end: number
  }

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

  const isSpeaking = ref(false)
  function speak(text: string) {
    if (!text || !audioRef.value || voiceDisabled.value || isSpeaking.value) return

    const timestamp = Timestamp[text]
    if (!timestamp) {
      console.warn('No timestamp found for:', text)
      return
    }

    const audio = audioRef.value
    audio.pause()
    audio.currentTime = 0
    audio.currentTime = timestamp.start

    // 创建时间更新处理函数
    const timeUpdateHandler = () => {
      if (audio.currentTime >= timestamp.end) {
        audio.pause()
        audio.removeEventListener('timeupdate', timeUpdateHandler)
        isSpeaking.value = false
      }
    }

    // 添加时间更新监听
    audio.addEventListener('timeupdate', timeUpdateHandler)

    // 开始播放
    isSpeaking.value = true
    audio.play().catch((error) => {
      audio.pause()
      audio.removeEventListener('timeupdate', timeUpdateHandler)
      isSpeaking.value = false
      console.error('Failed to play audio:', error)
    })
  }

  const voiceDisabled = ref(false)
  const audioRef = ref<HTMLAudioElement | null>(null)

  function toggleVoice() {
    voiceDisabled.value = !voiceDisabled.value
    if (audioRef.value) {
      audioRef.value.muted = voiceDisabled.value

      if (voiceDisabled.value) {
        audioRef.value.pause()
      }
    }
  }
</script>

<template>
  <div class="xy-between">
    <div class="xy child-borders">
      <button @click="displayMode = 'both'">両方表示</button>

      <button @click="displayMode = 'hiragana'">あ</button>

      <button @click="displayMode = 'katakana'">ア</button>
    </div>

    <div class="xy child-borders">
      <audio
        ref="audioRef"
        controls
        preload="auto"
        v-if="isDev"
      >
        <source
          src="./assets/fifty-sound.mp3"
          type="audio/mp3"
        />
      </audio>

      <button
        class="xy"
        @click="toggleVoice"
      >
        <MaterialSymbolsVolumeOff v-if="voiceDisabled" />
        <MaterialSymbolsVolumeUp v-else />
      </button>
    </div>
  </div>

  <div class="flex-1 yx">
    <div
      v-for="(row, rowIndex) in hiragana"
      :key="rowIndex"
      class="flex-1 xy"
    >
      <div
        v-for="(cell, cellIndex) in row"
        :key="cellIndex"
        class="flex-1 xy-center border cursor-pointer"
        :class="[
          cell || katakana[rowIndex][cellIndex] ? '' : 'hidden',
          ['border', 'border-1', 'border-2', 'border-3', 'border-4', 'border-5', 'border-6'][
            Math.floor(Math.random() * 7)
          ],
        ]"
        @click="() => speak(cell)"
      >
        <span v-if="displayMode === 'hiragana' || displayMode === 'both'">
          {{ cell }}
        </span>
        <span v-if="displayMode === 'katakana' || displayMode === 'both'">
          {{ katakana[rowIndex][cellIndex] }}
        </span>
      </div>
    </div>
  </div>
</template>
