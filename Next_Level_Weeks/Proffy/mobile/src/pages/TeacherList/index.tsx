import React, { useState } from 'react';
import { View, Text, Picker } from 'react-native';
import {
  ScrollView,
  BorderlessButton,
  RectButton,
} from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { Feather } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

import TeacherItem, { Teacher } from '../../components/TeacherItem';
import PageHeader from '../../components/PageHeader';

import api from '../../services/api';

import filtersData from '../../data/filters.json';

import styles from './styles';

const TeacherList = () => {
  const [isFiltersVisible, setIsFiltersVisible] = useState(true);

  const [teachers, setTeachers] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  const [subject, setSubject] = useState('Artes');
  const [week_day, setWeekDay] = useState('0');
  const [time, setTime] = useState('');
  const [showTimePicker, setShowTimePicker] = useState(false);

  function handleChangedSelectedDate(event: any, selectedDate: any) {
    const hour = selectedDate.getHours();
    const minutes = selectedDate.getMinutes();

    setShowTimePicker(false);

    const selectedTime = `${hour}:${minutes}`;
    setTime(selectedTime);
  }

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then((response) => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);
        const favoritedTeachersId = favoritedTeachers.map(
          (teacher: Teacher) => {
            return teacher.id;
          }
        );

        setFavorites(favoritedTeachersId);
      }
    });
  }

  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
    }, [])
  );

  async function handleFiltersSubmit() {
    loadFavorites();

    const response = await api.get('/classes', {
      params: {
        subject,
        week_day,
        time,
      },
    });

    setTeachers(response.data);
    handleToogleFiltersVisible();
  }

  function handleToogleFiltersVisible() {
    setIsFiltersVisible(!isFiltersVisible);
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title={'Proffys Disponíveis'}
        headerRight={
          <BorderlessButton onPress={handleToogleFiltersVisible}>
            <Feather name="filter" size={20} color={'#FFF'} />
          </BorderlessButton>
        }
      >
        {isFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <Picker
              style={styles.input}
              onValueChange={(value) => setSubject(String(value))}
            >
              {filtersData.subjects.map((subject) => (
                <Picker.Item
                  key={subject.value}
                  label={subject.label}
                  value={subject.value}
                />
              ))}
            </Picker>

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da Semana</Text>
                <Picker
                  style={styles.input}
                  onValueChange={(value) => setWeekDay(String(value))}
                >
                  {filtersData.days.map((day) => (
                    <Picker.Item
                      key={day.value}
                      label={day.label}
                      value={day.value}
                    />
                  ))}
                </Picker>
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <RectButton
                  style={styles.input}
                  onPress={() => setShowTimePicker(true)}
                >
                  <Text>{time}</Text>
                </RectButton>
                {showTimePicker && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    mode={'time'}
                    is24Hour={true}
                    display="default"
                    onChange={handleChangedSelectedDate}
                  />
                )}
              </View>
            </View>

            <RectButton
              style={styles.submitButton}
              onPress={handleFiltersSubmit}
            >
              <Text style={styles.submitButtonText}>Buscar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {teachers.map((teacher: Teacher) => (
          <TeacherItem
            key={teacher.id}
            teacher={teacher}
            favorited={favorites.includes(teacher.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default TeacherList;
