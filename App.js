import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { vibrate } from './utils'
import BotonGenerico from './components/botonGenerico.js'
import Reloj from './components/reloj.js'

//Inicio la variable que me va a permitir manejar el timer
let invervalo = null;

//Inicio la variable para contar los segundos
let contador = 5;

export default function App() {
  //Inicializo los hooks necesarios
  const [segundos, setSegundos] = useState(contador);
  const [estado, setEstado] = useState(false);
  const [modoTrabajo, setModoTrabajo] = useState(true);
  const [estadoTexto, setEstadoTexto] = useState("trabajo");
  const [btnEmpezarHabilitado, setbtnEmpezarHabilitado] = useState(true);
  const [btnDetenerHabilitado, setbtnDetenerHabilitado] = useState(false);


  //Seteo un efecto al cambiar el estado del cronometro
  useEffect(() => {
    if (estado) {
      invervalo = setInterval(() => {
        contador = contador - 1
        setSegundos(contador);
      }, 1000);
    } else {
      clearInterval(invervalo);
    }
  }, [estado]);

  //Seteo un efecto al cambiar el modo de trabajo o descanso
  useEffect(() => {
    if (modoTrabajo) {
      contador = 5
      setEstadoTexto("trabajo")
      setSegundos(5)
    } else {
      contador = 3
      setEstadoTexto("descanso")
      setSegundos(3)
    }
  }, [modoTrabajo]);

//Seteo un efecto para controlar el cambio de modo y la vibracion
  useEffect(() => {
    if (contador == 0) {
      vibrate();
    }
    if (contador == -1) {
      setModoTrabajo(!modoTrabajo)
    }
  },[segundos])

  //Funcion para reiniciar los contadores
  const reiniciar = () => {
    if (estado) {
      setEstado(false);
      setSegundos(5);
      setModoTrabajo(true)
      setEstadoTexto("trabajo")
    } else {
      setSegundos(contador);
    }
    setbtnDetenerHabilitado(false)
    setbtnEmpezarHabilitado(true)
    setModoTrabajo(true);
  }

  const habilitarReloj = () => {
    setEstado(true)
    setbtnEmpezarHabilitado(false);
    setbtnDetenerHabilitado(true)
  }

  const deshabilitarReloj = () => {
    setEstado(false)
    setbtnDetenerHabilitado(false)
    setbtnEmpezarHabilitado(true)
  }

  return (
    <View style={styles.container}>
      <Text>Es hora de {estadoTexto}</Text>
      <Reloj seg= {segundos}/>
      <BotonGenerico titulo ={"Empezar"} funcionCallback = {habilitarReloj} habilitado = {btnEmpezarHabilitado} />
      <BotonGenerico titulo ={"Detener"} funcionCallback = {deshabilitarReloj} habilitado = {btnDetenerHabilitado} />
      <BotonGenerico titulo ={"Reiniciar"} funcionCallback = {reiniciar} habilitado = {true} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
