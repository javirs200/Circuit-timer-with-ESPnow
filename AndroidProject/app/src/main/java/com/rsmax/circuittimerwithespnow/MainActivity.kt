package com.rsmax.circuittimerwithespnow

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.wrapContentSize
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.TextUnit
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.rsmax.circuittimerwithespnow.ui.theme.CircuitTimerWithESPnowTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            CircuitTimerWithESPnowTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    TimeContainer(
                        name = "HelloWorld",
                        modifier = Modifier.padding(innerPadding)
                    )
                }
            }
        }
    }
}

@Composable
fun TimeContainer(name: String, modifier: Modifier = Modifier) {
    Card(
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surfaceVariant,
        ),
        modifier = Modifier.wrapContentSize()
    ) {
        Text(
            text = name,
            fontSize = 100.sp,
            modifier = Modifier
                .padding(16.dp),
            textAlign = TextAlign.Center,
        )
    }
}

@Preview(showBackground = true, device = "spec:parent=virtualPoco,orientation=landscape")
@Composable
fun GreetingPreview() {
    CircuitTimerWithESPnowTheme {
        Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
            TimeContainer(
                name = "Android",
                modifier = Modifier.padding(innerPadding)
            )
        }
    }
}