import React, { useState } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';
import { useFileManager } from '@/hooks/useFileManager';
import { FileItemComponent } from '@/components/FileItem';
import { DiskStats } from '@/components/DiskStats';
import { CreateFolderModal } from '@/components/modals/CreateFolderModal';
import { TextFileModal } from '@/components/modals/TextFileModal';
import { FileDetailModal } from '@/components/modals/FileDetailModal';
import { FileDetail } from "@/types/filteTypes" 

import * as FileSystem from 'expo-file-system';

const BASE_PATH = FileSystem.documentDirectory + 'AppData/';

const FileManagerScreen = () => {
  const {
    currentPath,
    fileList,
    diskStats,
    navigateToFolder,
    navigateUp,
    loadDirectory,
    loadDiskStats,
  } = useFileManager();

  const [showFolderModal, setShowFolderModal] = useState(false);
  const [showTextModal, setShowTextModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [textFileName, setTextFileName] = useState('');
  const [textContent, setTextContent] = useState('');
  const [editingFilePath, setEditingFilePath] = useState<string | null>(null);
  const [fileDetail, setFileDetail] = useState<FileDetail | null>(null);

  const handleCreateFolder = async () => {
    if (folderName.trim() === '') return;
    try {
      await FileSystem.makeDirectoryAsync(currentPath + folderName);
      setFolderName('');
      setShowFolderModal(false);
      loadDirectory(currentPath);
    } catch (error) {
      Alert.alert('Error', 'Failed to create folder');
    }
  };

  const handleCreateTextFile = async () => {
    if (textFileName.trim() === '') return;
    try {
      const filePath = `${currentPath}${textFileName}.txt`;
      await FileSystem.writeAsStringAsync(filePath, textContent);
      resetTextModal();
      loadDirectory(currentPath);
    } catch (error) {
      Alert.alert('Error', 'Failed to create file');
    }
  };

  const handleSaveEdits = async () => {
    if (!editingFilePath) return;
    try {
      await FileSystem.writeAsStringAsync(editingFilePath, textContent);
      resetTextModal();
      loadDirectory(currentPath);
    } catch (error) {
      Alert.alert('Error', 'Failed to save changes');
    }
  };

  const resetTextModal = () => {
    setTextFileName('');
    setTextContent('');
    setEditingFilePath(null);
    setShowTextModal(false);
  };

  // Item interactions
  const handleDeleteItem = (name: string, isDirectory: boolean) => {
    Alert.alert('Confirm Delete', `Delete ${name}?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await FileSystem.deleteAsync(currentPath + name);
            loadDirectory(currentPath);
            loadDiskStats();
          } catch (error) {
            Alert.alert('Error', 'Failed to delete item');
          }
        },
      },
    ]);
  };

  const handleShowDetail = async (name: string, isDirectory: boolean) => {
    try {
      const info = await FileSystem.getInfoAsync(currentPath + name);
      setFileDetail({
        name,
        isDirectory,
        size: info.size ?? 0,
        modificationTime: info.modificationTime,
      });
      setShowDetailModal(true);
    } catch (error) {
      Alert.alert('Error', 'Failed to get file details');
    }
  };

  const handleOpenTextFile = async (name: string) => {
    try {
      const filePath = `${currentPath}${name}`;
      const content = await FileSystem.readAsStringAsync(filePath);
      setTextFileName(name.replace(/\.txt$/, ''));
      setTextContent(content);
      setEditingFilePath(filePath);
      setShowTextModal(true);
    } catch (error) {
      Alert.alert('Error', 'Failed to open file for editing');
    }
  };


  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={navigateUp}
          disabled={currentPath === BASE_PATH}
        >
          <Text style={[
            styles.navButton,
            currentPath === BASE_PATH && styles.disabled
          ]}>
            ↑
          </Text>
        </TouchableOpacity>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Text style={styles.pathText}>
            {currentPath.replace(BASE_PATH, 'AppData/')}
          </Text>
        </ScrollView>
      </View>

      <DiskStats {...diskStats} />

      <FlatList
        data={fileList}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <FileItemComponent
            item={item}
            onPress={() => item.isDirectory 
              ? navigateToFolder(item.name) 
              : handleOpenTextFile(item.name)
            }
            onDelete={() => handleDeleteItem(item.name, item.isDirectory)}
            onLongPress={() => handleShowDetail(item.name, item.isDirectory)}
          />
        )}
        contentContainerStyle={styles.listContent}
      />

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => setShowFolderModal(true)}
        >
          <Text style={styles.actionButtonText}>New Folder</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => {
            setEditingFilePath(null);
            setShowTextModal(true);
          }}
        >
          <Text style={styles.actionButtonText}>New File</Text>
        </TouchableOpacity>
      </View>

      {/* Modals */}
      <CreateFolderModal
        visible={showFolderModal}
        folderName={folderName}
        setFolderName={setFolderName}
        onCreate={handleCreateFolder}
        onCancel={() => setShowFolderModal(false)}
      />

      <TextFileModal
        visible={showTextModal}
        fileName={textFileName}
        content={textContent}
        isEditing={!!editingFilePath}
        setFileName={setTextFileName}
        setContent={setTextContent}
        onSave={editingFilePath ? handleSaveEdits : handleCreateTextFile}
        onCancel={resetTextModal}
      />

      <FileDetailModal
        visible={showDetailModal}
        fileDetail={fileDetail}
        onClose={() => setShowDetailModal(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 40 : 20,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  navButton: {
    fontSize: 24,
    color: '#007AFF',
    marginRight: 16,
  },
  disabled: {
    color: '#b0b0b0',
  },
  pathText: {
    fontSize: 16,
    color: '#424242',
  },
  listContent: {
    paddingHorizontal: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  actionButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 2,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default FileManagerScreen;