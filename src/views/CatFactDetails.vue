<template>
  <v-card-title class="c">
    {{ $t('detailsOfId') }} : <span class="text">{{ catFact ? catFact._id : '' }}</span>
  </v-card-title>
  <router-link to="/" class="router">
    <v-btn icon class="d-flex justify-center align-center mx-auto">
      <v-icon>mdi-home</v-icon>
    </v-btn>
  </router-link>
  <v-container>
    <v-card class="cat-fact-details">
      <div class="div">
        <v-card-title>
          {{ catFact ? getTranslatedText('catFactText', catFact.text) : '' }}
        </v-card-title>

        <v-card-subtitle>
          <span v-if="catFact">{{ $t('userFirstName') }} {{ catFact.user.name.first }} {{ $t('userLastName') }} {{ catFact.user.name.last }}</span>
          <v-spacer></v-spacer>
          <v-chip label v-if="catFact">{{ $t('catFactType') }} {{ catFact.type }}</v-chip>
        </v-card-subtitle>
      </div>
      <v-card-text>
        <div>
          <v-row>
            <v-col cols="">
              <v-icon color="green" v-if="catFact && catFact.status.verified">mdi-check-circle-outline</v-icon>

              <div v-else class="d-flex justify-center">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
              </div>
              <span v-if="catFact" class="load">{{ catFact.status.sentCount }} {{ $t('sentCount') }}</span>
              <span v-if="catFact" v-text="$t('catFactSource')" class="red"></span>
            </v-col>

            <span v-if="catFact" class="updated">{{ $t('updated') }} {{ catFact.updatedAt }}</span>
            <span v-if="catFact" class="updated">{{ $t('created') }} {{ catFact.createdAt }}</span>
          </v-row>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script lang ="ts">
import { defineComponent } from 'vue';
import { RouteParams } from 'vue-router';
import axios, { AxiosError } from 'axios';

interface CatFact {
  _id: string;
  text: string;
  status: {
    verified: boolean;
    sentCount: number;
  };
  user: {
    name: {
      first: string;
      last: string;
    };
    photo: string;
    _id: string;
  };
  source: string;
  updatedAt: string;
  type: string;
  createdAt: string;
  deleted: boolean;
  used: boolean;
}

export default defineComponent({
  name: 'CatFactDetails',
  data() {
    return {
      catFact: null as CatFact | null,
      error: '',
      currentLanguage: 'en',
    };
  },
  mounted() {
    
    const { id } = this.$route.params as RouteParams<{ id: string }>;
    try {
      axios.get<CatFact>(`https://cat-fact.herokuapp.com/facts/${id}`)
        .then((response) => {
          this.catFact = response.data;
        })
        .catch((error) => {
          if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            this.error = axiosError.message;
            console.error(axiosError.toJSON());
          } else {
            console.error(error);
          }
        });
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    getTranslatedText(key: string, fallbackText: string) {
      const translation = this.$t(key) as string;
      return this.currentLanguage === 'ru' ? translation : fallbackText;
    },
  },
});
</script>

<style scoped>

.cat-fact-details {
  width:50%;
  text-align: center;
  margin: 100px auto;
  
}
.c {
  text-align: center;
padding-top:22px;
  
}
.text{
  color:green
}
.red{
  background:#e4eaeb;
  
 border-radius:2px;
 display:flex;
 width:100px;
 height:32px;
 margin :10px auto;
 justify-content:center;
 align-items:center;
}
.red:hover{
  box-shadow:1px 1px 1px 1px lightGray;
}
.div{
    background:#e6dfdf;
  
 
 border-radius:4px;
 display:flex-row;
 padding-bottom:12px;
 width:80%;
 
 margin :10px auto;
 justify-content:center;
 align-items:center;
 
}

.div:hover{
  box-shadow:1px 1px 1px 1px lightgray;
}

.router{
  
  text-decoration: none;

}

.card-animation {
  animation: fade-in 0.5s ease-out;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-title {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
}

.card-subtitle {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}

.card-subtitle v-chip {
  margin-left: 10px;
}

.card-text {
  font-size: 16px;
  margin-top: 30px;
}

.card-text v-row {
  align-items: center;
}

.card-text v-col {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.card-text v-icon {
  margin-right: 10px;
}

.card-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 30px;
}

@media (max-width: 600px) {
  .card-title {
    font-size: 28px;
  }

  .card-subtitle {
    font-size: 14px;
  }

  .card-text {
    font-size: 14px;
  }

  .card-text v-col {
    font-size: 12px;
  }
}
.load{
  width:100%;
  display:flex;
  justify-content:center;
}
.updated{
  width:100%;
  text-align:center;
  margin-bottom:22px;
  font-weight:bold;
}

</style>