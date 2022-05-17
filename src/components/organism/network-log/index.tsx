import React, { FC, useState, useCallback, memo } from "react"
import { TouchableOpacity, Modal, View, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import NetworkLogger from "react-native-network-logger"

// Styles
import styles from "./styles"

// Component Props
export interface NetworkLogProps {}

export const NetworkLog: FC<NetworkLogProps> = memo((props) => {
  const [isLoggerShow, setIsLoggerShow] = useState(false)

  /**
   * Toggle modal handler
   */
  const toggleModal = useCallback(() => setIsLoggerShow(!isLoggerShow), [isLoggerShow])

  return (
    <>
      <TouchableOpacity activeOpacity={0.9} style={styles.button} onPress={() => toggleModal()}>
        <Text style={styles.label}>{`Network\nLog`}</Text>
      </TouchableOpacity>

      <Modal visible={isLoggerShow}>
        <SafeAreaView style={styles.logContainer}>
          <View style={styles.logContainerHeader}>
            <Text onPress={toggleModal} style={styles.closeLabel}>
              CLOSE
            </Text>
          </View>

          <NetworkLogger />
        </SafeAreaView>
      </Modal>
    </>
  )
})
