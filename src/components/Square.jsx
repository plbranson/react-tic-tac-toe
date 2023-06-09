/*
 *  Copyright 2023 Patrick L. Branson
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import React from 'react'

import '../styles/Square.css'

export default function Square({ value, onClick }) {
  // Used to determine the css styles that is going to be applied to the DOM
  const style = value === 'X' ? 'square cross' : 'square circle'

  return (
    <button className={style} onClick={onClick}>
      {value}
    </button>
  )
}
