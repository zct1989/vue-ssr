import {
  getCurrentInstance,
  onMounted,
  onUpdated,
  customRef,
  Ref
} from 'vue'

// eslint-disable-next-line
type ComponentType = any

export function templateRef(
  key: string
): Readonly<Ref<ComponentType>> {
  const instance = getCurrentInstance()
  let _trigger = () => {
    // EMPTY
  }

  const element = customRef((track, trigger) => {
    _trigger = trigger
    return {
      get() {
        track()
        return instance?.proxy?.$refs[key] ?? null
      },
      set() {
        // EMPTY
      }
    }
  })

  onMounted(_trigger)
  onUpdated(_trigger)

  return element as Readonly<Ref<ComponentType>>
}
