import { useEffect, useState } from 'react';
import * as FileSystem from 'expo-file-system';
import { FileItem, FileDetail } from '@/types/filteTypes';

const BASE_PATH = FileSystem.documentDirectory + 'AppData/';

export const useFileManager = () => {
  const [currentPath, setCurrentPath] = useState(BASE_PATH);
  const [fileList, setFileList] = useState<FileItem[]>([]);
  const [diskStats, setDiskStats] = useState({ total: 0, free: 0, occupied: 0 });
  
  // Initialization
  useEffect(() => {
    initializeAppData();
    loadDiskStats();
  }, []);

  const initializeAppData = async () => {
    const info = await FileSystem.getInfoAsync(BASE_PATH);
    if (!info.exists) {
      await FileSystem.makeDirectoryAsync(BASE_PATH, { intermediates: true });
    }
    loadDirectory(currentPath);
  };

  const loadDirectory = async (path: string) => {
    try {
      const items = await FileSystem.readDirectoryAsync(path);
      const fileItems = await Promise.all(
        items.map(async (name) => {
          const info = await FileSystem.getInfoAsync(path + name);
          return { name, isDirectory: info.isDirectory };
        })
      );
      setFileList(fileItems);
    } catch (error) {
      console.error('Error reading directory:', error);
    }
  };

  const loadDiskStats = async () => {
    try {
      const free = await FileSystem.getFreeDiskStorageAsync();
      const total = await FileSystem.getTotalDiskCapacityAsync();
      setDiskStats({ free, total, occupied: total ? total - free : 0 });
    } catch (error) {
      console.error('Error getting disk stats:', error);
    }
  };

  const navigateToFolder = (folderName: string) => {
    const newPath = currentPath + folderName + '/';
    setCurrentPath(newPath);
    loadDirectory(newPath);
  };

  const navigateUp = () => {
    if (currentPath === BASE_PATH) return;
    const pathWithoutSlash = currentPath.endsWith('/') ? currentPath.slice(0, -1) : currentPath;
    const parentPath = pathWithoutSlash.substring(0, pathWithoutSlash.lastIndexOf('/') + 1);
    setCurrentPath(parentPath);
    loadDirectory(parentPath);
  };

  return {
    currentPath,
    fileList,
    diskStats,
    navigateToFolder,
    navigateUp,
    loadDirectory,
    loadDiskStats
  };
};