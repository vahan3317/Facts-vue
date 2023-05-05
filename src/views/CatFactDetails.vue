<template>
<v-card-title class="c ">
     Details Of ID: <span class="text">{{ catFact ? catFact._id : '' }}</span>
      </v-card-title>
  <v-container>
    <v-card class='cat-fact-details'>
      <v-card-title>
        {{ catFact ? catFact.text : '' }}
      </v-card-title>
      <v-card-subtitle>
        <span v-if="catFact">{{ catFact.user.name.first }} {{ catFact.user.name.last }}</span>
        <v-spacer></v-spacer>
        <v-chip label v-if="catFact">{{ catFact.type }}</v-chip>
      </v-card-subtitle>
      <v-card-text>
       <div >
        <v-row class="c" >
          <v-col cols="7 "  >
            <v-icon color="green" v-if="catFact && catFact.status.verified">mdi-check-circle-outline</v-icon>
            
              <v-card-title v-else class="load">
                 loading...
      </v-card-title>
            <span v-if="catFact">{{ catFact.status.sentCount }} Sent</span>
          </v-col>
          <v-col cols="4">
            <span v-if="catFact">{{ catFact.source }}</span>
          </v-col>
          <v-col cols="2">
            <span v-if="catFact">{{ formatDate(catFact.updatedAt) }}</span>
          </v-col>
        </v-row>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <span v-if="catFact">{{ formatDate(catFact.createdAt) }}</span>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script lang="ts">
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
  data: () => ({
    catFact: null as CatFact | null,
    error: '',
  }),
  async mounted() {
    const { id } = this.$route.params as RouteParams<{ id: string }>;
    try {
      const response = await axios.get<CatFact>(`https://cat-fact.herokuapp.com/facts/${id}`);
      this.catFact = response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        this.error = axiosError.message;
        console.error(axiosError.toJSON());
      } else {
        console.error(error);
      }
    }
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

</style>